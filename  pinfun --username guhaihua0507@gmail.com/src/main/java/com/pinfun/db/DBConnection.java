package com.pinfun.db;

import java.sql.Connection;
import java.sql.DriverManager;

/** 
 * 
 * @author dingyong
 *
 */

public class DBConnection {
	private Connection con;

	public DBConnection(String driver, String url) throws Exception {
		Class.forName(driver);
		con = DriverManager.getConnection(url);
		con.setAutoCommit(false);
	}

	public DBConnection(String driver, String url, String userName, String password) throws Exception {
		Class.forName(driver);
		con = DriverManager.getConnection(url, userName, password);
	}

	public Connection getConnection() {
		return con;
	}
}
