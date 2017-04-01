package ca.sait.stars;

import java.io.InputStream;

import org.junit.Ignore;
import org.springframework.stereotype.Component;

@Ignore
@Component
public class ResourceReader {

	private static final int BUFFER_SIZE = 1024;

	/**
	 * Read file in src/main/resources/ folder
	 * 
	 * @param path
	 *            must be a String like "\<directory\>/\<file\>", e.g.
	 *            "test/user.json"
	 * @return String representation of the file content
	 * @throws Exception
	 */
	public String readFromResources(String path) throws Exception {
		StringBuilder sb = new StringBuilder();
		byte[] buffer = new byte[BUFFER_SIZE];

		int bytes = 0;
		try (InputStream is = this.getClass().getClassLoader().getResourceAsStream(path)) {
			do {
				bytes = is.read(buffer);

				if (bytes > 0)
					sb.append(new String(buffer, 0, bytes));
			} while (bytes != -1);
		}

		return sb.toString();
	}

	/**
	 * Read file in src/main/resources/test/ folder
	 * 
	 * @param path
	 *            must be a String like "\<directory\>/\<file\>", e.g.
	 *            "test/user.json"
	 * @return String representation of the file content
	 * @throws Exception
	 */
	public String readFromTest(String path) throws Exception {
		return readFromResources("test/" + path);
	}
}
