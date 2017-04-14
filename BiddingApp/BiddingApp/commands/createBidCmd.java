package BiddingApp.commands;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.Map;

import redis.clients.jedis.Jedis;

public class createBidCmd extends Command implements Runnable {

	@Override
	public StringBuffer execute(Connection connection, Map<String, Object> mapUserData) throws Exception {
		
		StringBuffer strbufResult;
		CallableStatement sqlProc;
		
		String strUserId;
		String strItemId;
		double strBidAmount;
		
		Jedis jedis = new Jedis("localhost");
		if (jedis.get("user_id") != null)
			strUserId = (jedis.get("user_id"));
		else
			strUserId = null;
		
//		strUserId = (String) mapUserData.get("user_id");
		strItemId = (String) mapUserData.get("item_id");
		strBidAmount = (double) mapUserData.get("bid_amount");
		
		sqlProc = connection.prepareCall("{?=call createBid(?,?,?)}");
		sqlProc.registerOutParameter(1, Types.INTEGER);
		sqlProc.setString(2, strUserId);
		sqlProc.setString(3, strItemId);
		sqlProc.setDouble(4, strBidAmount);

		sqlProc.execute();
		strbufResult = makeJSONResponseEnvelope(sqlProc.getInt(1), null, null);
		sqlProc.close();
		
		return strbufResult;
	}
	
}
