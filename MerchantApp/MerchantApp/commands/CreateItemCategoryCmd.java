package MerchantApp.commands;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.Map;

import com.google.gson.JsonObject;

//// Item Category Cmd
public class CreateItemCategoryCmd extends Command implements Runnable {

	public StringBuffer execute(Connection connection, Map<String, Object> mapUserData) throws Exception {

		StringBuffer strbufResult;
		CallableStatement sqlProc;
		int intItemID, intCategoryID;

		intItemID = Integer.parseInt((String) mapUserData.get("itemid"));
		// System.out.println("---> " + intItemID);
		intCategoryID = Integer.parseInt((String) mapUserData.get("categoryid"));
		// System.out.println("--->> " + intCategoryID);

		if (intItemID <= 0 || intCategoryID <= 0) {
			StringBuffer errorBuffer = new StringBuffer();
			JsonObject error = new JsonObject();
			error.addProperty("errorMsg", "error");
			errorBuffer.append(error.toString());
			return errorBuffer;
		}

		sqlProc = connection.prepareCall("{?=call createItemCategory(?,?)}");
		sqlProc.registerOutParameter(1, Types.INTEGER);
		sqlProc.setInt(2, intItemID);
		sqlProc.setInt(3, intCategoryID);
		sqlProc.execute();
		StringBuffer sb = new StringBuffer();
		sb.append(sqlProc.getInt(1));
		if (!sb.toString().equals(null)) {
			strbufResult = makeJSONResponseEnvelope(200, null, sb);
			sqlProc.close();

			return strbufResult;
		} else {
			sqlProc.close();

			StringBuffer errorBuffer = new StringBuffer();
			JsonObject error = new JsonObject();
			error.addProperty("errorMsg", "error");
			errorBuffer.append(error.toString());
			return errorBuffer;
		}
	}
}