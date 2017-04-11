angular.module('stars')

	.controller("adminCtrl", ["$scope", "$cookieStore", "$location", "sendRequest", function ($scope, $cookieStore, $location, sendRequest) {
		setNavBar();

		$scope.isCreation = true;
		$scope.username = "";
		$scope.password = "";
		$scope.firstname = "";
		$scope.lastname = "";
		$scope.email = "";

		$scope.gender = {
			code: 'Unknown',
			genders: [
				{ id: 'Male', name: 'Male' },
				{ id: 'Female', name: 'Female' },
				{ id: 'Other', name: 'Other' },
				{ id: 'Unknown', name: 'Unknown' }
			]
		};

		var getUsers = function () {
			sendRequest.send(
				'GET',
				'users',
				function (result) {
					$scope.users = result.data._embedded.users;
				},
				function (error) {
					$scope.notice = "You don't have admin privilege to see other uses";
				},
				null,
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};

		getUsers();

		$scope.promoteUser = function (username) {

			var newUser = {};

			$scope.users.forEach(function (user) {
				if (username === user.id) {
					newUser.username = user.id;
					newUser.isAdmin = true;
				}
			});

			sendRequest.send(
				'PATCH',
				'users/' + username,
				function (result) {
					getUsers();
					$scope.notice = "You successfully promoted " + username;
				},
				function (error) {
					$scope.notice = "An error occurred when promoting " + username;
				},
				newUser,
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};

		$scope.demoteUser = function (username) {

			var newUser = {};

			$scope.users.forEach(function (user) {
				if (username === user.id) {
					newUser.username = user.id;
					newUser.isAdmin = false;
				}
			});

			sendRequest.send(
				'PATCH',
				'users/' + username,
				function (result) {
					getUsers();
					$scope.notice = "You successfully demoted " + username;
				},
				function (error) {
					if (error.status === 406) {
						$scope.notice = "You can't demote yourself";
					} else {
						$scope.notice = "An error occurred when demoting " + username;
					}
				},
				newUser,
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};

		$scope.editUser = function (username) {

			$scope.isCreation = false;

			$scope.users.forEach(function (user) {
				if (username === user.id) {
					$scope.username = user.id;
					$scope.password = "";
					$scope.firstname = user.firstname;
					$scope.lastname = user.lastname;
					$scope.email = user.email;
					$scope.gender.code = user.sex;
					$scope.weight = user.weight;
					$scope.height = user.height;
					$scope.isAdmin = user.isAdmin;
				}
			});
		};

		$scope.saveUser = function (username) {
			var userToBeSaved = {
				username: $scope.username,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				email: $scope.email,
				sex: $scope.gender.code,
				height: $scope.height,
				weight: $scope.weight,
				isAdmin: $scope.isAdmin
			};

			if ($scope.password.length > 0) {
				console.log($scope.password.length);
				userToBeSaved.password = $scope.password;
			}

			sendRequest.send(
				'PATCH',
				'users/' + $scope.username,
				function (result) {
					$scope.isCreation = true;
					if ($scope.username === $cookieStore.get("username") && $scope.password)
						$cookieStore.put("password", $scope.password);
					getUsers();

					$scope.username = "";
					$scope.password = "";
					$scope.firstname = "";
					$scope.lastname = "";
					$scope.email = "";
					$scope.gender.code = 'Male';
					$scope.notice = username + " has been successfully updated";
					$scope.errMsg = null;
				},
				function (error) {
					if (error.status === 406) {
						$scope.notice = username + " can not be updated because of invalid input. Please check error information under your input";
						$scope.errMsg = error.data;
					} else {
						$scope.notice = "An error occurred while editing user";
					}
				},
				userToBeSaved,
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};

		$scope.deleteUser = function (username) {
			sendRequest.send(
				'DELETE',
				'users/' + username,
				function (result) {
					getUsers();
					$scope.notice = "You successfully deleted " + username;
				},
				function (error) {
					if (error.status === 406) {
						$scope.notice = "You can't delete yourself";
					} else {
						$scope.notice = "You may have just lost admin privilege to deleted the user";
					}
				},
				null,
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};

		$scope.createUser = function () {

			sendRequest.send(
				'POST',
				'users',
				function (result) {
					getUsers();

					var username = $scope.username;

					$scope.username = "";
					$scope.password = "";
					$scope.firstname = "";
					$scope.lastname = "";
					$scope.email = "";
					$scope.gender.code = 'Unknown';
					$scope.notice = username + " has been successfully created";
					$scope.errMsg = null;
				},
				function (error) {
					if (error.status === 406) {
						$scope.notice = $scope.username + " can not be created because of invalid input. Please check error information under your input";
						$scope.errMsg = error.data;
					} else {
						$scope.notice = "You may have just lost admin privilege to create a user";
					}
				},
				{
					username: $scope.username,
					password: $scope.password,
					firstname: $scope.firstname,
					lastname: $scope.lastname,
					email: $scope.email,
					sex: $scope.gender.code,
					weight: 0,
					height: 0,
					isAdmin: false
				},
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};

	}]);