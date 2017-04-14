package UserApp.commands;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.Map;

import com.mongodb.DB;
import com.mongodb.MongoClient;

public class AddAddressCommand extends Command implements Runnable {

	public StringBuffer execute(Connection connection, Map<String, Object> mapUserData) throws Exception {

		StringBuffer strbufResult;
		CallableStatement sqlProc;
		int UserID= Integer.parseInt((String) mapUserData.get("UserID"));
		String address = (String) mapUserData.get("address");
		
		sqlProc = connection.prepareCall("{call updateUser(?,?,?,?,?,?,?,?)}");
		sqlProc.registerOutParameter(1, Types.INTEGER);
   	    sqlProc.setInt(1, UserID);
   	    sqlProc.setString(2, address);
   	    
   	    sqlProc.execute();
   	    StringBuffer sb = new StringBuffer();
   	    sb.append(sqlProc.getInt(1));
   	    strbufResult = makeJSONResponseEnvelope(sqlProc.getInt(1), null, sb);
   	    sqlProc.close();
   	    
   	    return strbufResult;
	
}
}
  
  

 