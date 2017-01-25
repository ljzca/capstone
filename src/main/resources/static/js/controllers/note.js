angular.module('noteKeepr')

.controller("noteCtrl",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest){
	
	var searchAllCode = "PleasePassMe";
	
	$scope.isCreation = true;
	$scope.currentContent = "";
	$scope.editing = null;
	$scope.foundUsers = [];
	$scope.isOwner = true;
	
    var getOwnedNotes = function(content){
		if(!content)
			content = searchAllCode;
		
		console.log("username: "+$cookieStore.get("username"));
		console.log("password: "+$cookieStore.get("password"));
		
        sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/note/owned/'+content,
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				$scope.ownedNotes = result.data;
				if($scope.editing)
					selectNote($scope.editing.noteid);
            },
			function (error) {
                $scope.errMsg = "You haven't logged in";
            }
		)};
	
	var getCollaboratedNotes = function(content){
		if(!content)
			content = searchAllCode;
		
        sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/note/collaborated/'+content,
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				console.log("got all collaborated notes");
				console.log(result.data);
				$scope.collaboratedNotes = result.data;
            },
			function (error) {
                $scope.errMsg = "You haven't logged in";
            }
		);
	};
	
	$scope.searchNotes = function(content){
		getOwnedNotes(content);
		getCollaboratedNotes(content);
	}
	
	getOwnedNotes(searchAllCode);
	getCollaboratedNotes(searchAllCode);
	
	$scope.deleteNote = function(noteid){
		sendRequest.send(
			'DELETE',
			'http://localhost:8080/noteKeepr-web/rest/note/delete/'+noteid,
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				getOwnedNotes(searchAllCode);
            },
			function (error) {
                $scope.errMsg = "You haven't logged in";
            }
		);
	};
	
	var selectNote = function(noteid){
		
		console.log("selected note");
		
		$scope.ownedNotes.forEach(function(note){
			if(note.noteid === noteid){
				$scope.editing = note;
				$scope.isCreation = false;
				$scope.currentNoteOwned = true;
				$scope.currentContent = note.content;
				$scope.isOwner = true;
				$scope.foundUsers = [];
			}
		});
		$scope.collaboratedNotes.forEach(function(note){
			if(note.noteid === noteid){
				$scope.editing = note;
				$scope.isCreation = false;
				$scope.currentNoteOwned = false;
				$scope.currentContent = note.content;
				$scope.isOwner = false;
				$scope.foundUsers = [];
			}
		});
		
		console.log("selected note: " + noteid);
		console.log($scope.editing);
	};
	
	$scope.editNote = selectNote;
	
	$scope.saveNote = function(){
		
		if($scope.currentNoteOwned){
			sendRequest.send(
				'PUT',
				'http://localhost:8080/noteKeepr-web/rest/note',
				'application/json',
				$cookieStore.get("username"),
				$cookieStore.get("password"),
				{
					noteid:$scope.editing.noteid,
					content:$scope.currentContent
				},
				function (result) {
					getOwnedNotes(searchAllCode);
					$scope.isCreation = true;
					$scope.currentContent = "";
					$scope.editing = null;
				},
				function (error) {
					$scope.errMsg = "You haven't logged in";
				}
			);
		}else{
			sendRequest.send(
				'PUT',
				'http://localhost:8080/noteKeepr-web/rest/note/collaborate',
				'application/json',
				$cookieStore.get("username"),
				$cookieStore.get("password"),
				{
					noteid:$scope.editing.noteid,
					content:$scope.currentContent
				},
				function (result) {
					getCollaboratedNotes(searchAllCode);
					$scope.isCreation = true;
					$scope.currentContent = "";
					$scope.editing = null;
				},
				function (error) {
					$scope.errMsg = "You haven't logged in";
				}
			);
		}

	};
	
	$scope.createNote = function(){
		sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/note/create',
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (blankNoteCreationResult) {
				sendRequest.send(
					'PUT',
					'http://localhost:8080/noteKeepr-web/rest/note',
					'application/json',
					$cookieStore.get("username"),
					$cookieStore.get("password"),
					{
						noteid:blankNoteCreationResult.data.noteid,
						content:$scope.currentContent
					},
					function (result) {
						getOwnedNotes(searchAllCode);
						$scope.isCreation = true;
						$scope.currentContent = "";
						$scope.editing = null;
					},
					function (error) {
						$scope.errMsg = "You haven't logged in";
					}
				);

			},
			function (error) {
				$scope.errMsg = "You haven't logged in";
			}
		);
	};
	
	$scope.removeCollaborator = function(username){
		var noteid = $scope.editing.noteid;
		
		sendRequest.send(
			'DELETE',
			'http://localhost:8080/noteKeepr-web/rest/note/collaborate/'+noteid+'/'+username,
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				getOwnedNotes(searchAllCode);
				getCollaboratedNotes(searchAllCode);
			},
			function (error) {
				$scope.errMsg = "You haven't logged in";
			}
		);
	};
	
	$scope.search = function(coll){
		if(coll)
		
			sendRequest.send(
				'GET',
				'http://localhost:8080/noteKeepr-web/rest/user/'+coll+'/search',
				'application/json',
				$cookieStore.get("username"),
				$cookieStore.get("password"),
				null,
				function (result) {
					if($scope.editing){
						$scope.foundUsers = [];
						result.data.forEach(function(user){
							console.log(user.username);
							
							var alreadyColl = false;
							
							$scope.editing.collaborators.forEach(function(added){
								if(added.username === user.username){
									console.log("adding found user:"+user.username);
									alreadyColl = true;
								}
							});
							
							if(!alreadyColl){
								$scope.foundUsers.push(user);
							}
						});
					}else{
						$scope.foundUsers = result.data;
					}
					
				},
				function (error) {
					$scope.errMsg = "You haven't logged in";
				}
			);
	};
	
	$scope.addCollaborator = function(username){
		if($scope.isCreation)
			
			// create a new note
			sendRequest.send(
				'GET',
				'http://localhost:8080/noteKeepr-web/rest/note/create',
				'application/json',
				$cookieStore.get("username"),
				$cookieStore.get("password"),
				null,
				function (blankNoteCreationResult) {
					
					console.log(blankNoteCreationResult.data.noteid);

					// update content
					sendRequest.send(
						'PUT',
						'http://localhost:8080/noteKeepr-web/rest/note',
						'application/json',
						$cookieStore.get("username"),
						$cookieStore.get("password"),
						{
							noteid:blankNoteCreationResult.data.noteid,
							content:$scope.currentContent
						},
						function (result) {
							
							// add collaborator
							sendRequest.send(
								'PUT',
								'http://localhost:8080/noteKeepr-web/rest/note/collaborate/'+blankNoteCreationResult.data.noteid+'/'+username,
								'application/json',
								$cookieStore.get("username"),
								$cookieStore.get("password"),
								null,
								function (collResult) {
									
									// retrieve updated note
									sendRequest.send(
										'GET',
										'http://localhost:8080/noteKeepr-web/rest/note/id/'+blankNoteCreationResult.data.noteid,
										'application/json',
										$cookieStore.get("username"),
										$cookieStore.get("password"),
										null,
										function (updatedResult) {
											
											getOwnedNotes(searchAllCode);
											$scope.isCreation = false;
											$scope.currentContent = updatedResult.content;
											$scope.editing = updatedResult.data;
											$scope.foundUsers = [];
											$scope.isOwner = true;

										},
										function (error) {
											$scope.errMsg = "You haven't logged in";
										}
									);
								},
								function (error) {
									$scope.errMsg = "You haven't logged in";
								}
							);
						},
						function (error) {
							$scope.errMsg = "You haven't logged in";
						}
					);
				},
				function (error) {
					$scope.errMsg = "You haven't logged in";
				}
			);
		
		else
			
			// add collaborator
			sendRequest.send(
				'PUT',
				'http://localhost:8080/noteKeepr-web/rest/note/collaborate/'+$scope.editing.noteid+'/'+username,
				'application/json',
				$cookieStore.get("username"),
				$cookieStore.get("password"),
				null,
				function (collResult) {

					// retrieve updated note
					sendRequest.send(
						'GET',
						'http://localhost:8080/noteKeepr-web/rest/note/id/'+$scope.editing.noteid,
						'application/json',
						$cookieStore.get("username"),
						$cookieStore.get("password"),
						null,
						function (updatedResult) {

//							getOwnedNotes(searchAllCode);
//							$scope.isCreation = false;
//							$scope.currentContent = updatedResult.content;
							$scope.editing = updatedResult.data;
							$scope.foundUsers = [];
//							$scope.isOwner = true;

						},
						function (error) {
							$scope.errMsg = "You haven't logged in";
						}
					);
				},
				function (error) {
					$scope.errMsg = "You haven't logged in";
				}
			);
	}
	
}]);