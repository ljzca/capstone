package ca.sait.stars;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import ca.sait.stars.domains.Record;
import ca.sait.stars.domains.User;

/**
 * To convert an object to json
 * 
 * @author William Li
 *
 */
/*
 * I eventually find out that this converter cannot work with HAL. However, it's
 * fine to do general purposed Entity to JSON convertion (like jackson).
 */
public class JsonConverter {

	public static String toJson(Object t) throws Exception {
		Method[] methods = t.getClass().getMethods();
		StringBuilder sb = new StringBuilder();

		sb.append("{");

		/*
		 * invoke getters which have setters because as testing purpose, JSON
		 * string will be sent to the server and the set method will be called.
		 */
		for (Method method : methods)
			if (method.getName().startsWith("set")) {
				String currentPropertyName = method.getName().substring(3);
				for (Method toBeInvoked : methods)
					if (toBeInvoked.getName().startsWith("get")
							&& currentPropertyName.equals(toBeInvoked.getName().substring(3))) {
						currentPropertyName = currentPropertyName.substring(0, 1).toLowerCase()
								+ currentPropertyName.substring(1);
						Object result = toBeInvoked.invoke(t);
						if (result != null) {
							if (Number.class.isAssignableFrom(result.getClass())
									|| Boolean.class.isAssignableFrom(result.getClass())
									|| Character.class.isAssignableFrom(result.getClass())
									|| String.class.isAssignableFrom(result.getClass()))
								sb.append(currentPropertyName + ":" + result.toString() + ",");
							else if (Iterable.class.isAssignableFrom(result.getClass())) {
								StringBuilder isb = new StringBuilder();
								boolean isEmpty = true;
								isb.append(currentPropertyName);
								isb.append(":[");

								for (Object e : (Iterable<?>) result) {
									String s = toJson(e);
									if (!s.isEmpty()) {
										isb.append(s + ",");
										isEmpty = false;
									}
								}

								/*
								 * if isEmpty, isb will not be appended to sb
								 */
								if (!isEmpty) {
									isb.deleteCharAt(isb.length() - 1);
									isb.append("],");
									sb.append(isb);
								}
							} else
								sb.append(currentPropertyName + ":" + toJson(result) + ",");
							break;
						}
					}
			}

		if (sb.length() > 1)
			// delete the last comma
			sb.deleteCharAt(sb.length() - 1);
		else
			return "";

		sb.append("}");
		return sb.toString();
	}

	public static void main(String[] args) throws Exception {
		User user = new User();
		List<Record> records = new ArrayList<>();
		Record record1 = new Record(), record2 = new Record();
		record1.setDescription("dd");
		record2.setDescription("dd");
		records.add(record1);
		records.add(record2);
		user.setRecords(records);

		System.out.println(toJson(user));
	}
}
