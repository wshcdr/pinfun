package com.pinfun.db;

/** 
 * 
 * @author dingyong
 *
 */
public class DBConnectionFactory {
	private static String driver = "org.apache.derby.jdbc.ClientDriver";
	private static String url = "";//"jdbc:derby://localhost:1527/biddb;create=true";
	
	public static DBConnection newDBConnection() throws Exception {
		return new DBConnection(driver, url);
	}
}

