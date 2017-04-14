package commands;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.Map;

public class SendMessage extends Command implements Runnable {
	
 public StringBuffer execute(Connection connection, Map<String, Object> mapUserData) throws Exception {
		StringBuffer strbufResult;
		CallableStatement sqlProc;
		String message = (String) mapUserData.get("message"); 
		int senderID = Integer.parseInt((String) mapUserData.get("senderID"));
		int receiverID = Integer.parseInt((String) mapUserData.get("receiverID"));
		
		sqlProc = connection.prepareCall("{call updateUser(?,?,?,?,?,?,?,?)}");
		  sqlProc.registerOutParameter(1, Types.INTEGER);
		  sqlProc.setString(1,message);
		  sqlProc.setInt(2,senderID);
		  sqlProc.setInt(3,receiverID );
		  
		  sqlProc.execute();
		  StringBuffer sb = new StringBuffer();
		  sb.append(sqlProc.getInt(1));
		  strbufResult = makeJSONResponseEnvelope(sqlProc.getInt(1), null, sb);
		  sqlProc.close();
		  return strbufResult;
			

		
}

}