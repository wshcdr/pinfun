package com.pinfun.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.pinfun.Env;

/** 
 * 
 * @author dingyong
 *
 */

public class DBUtil {
	private static String driver;
	private static String url;
	private static String user ;
	private static String password;
	static {
		driver = Env.get("DB_DRIVER");
		url = Env.get("DB_URL");
		user = Env.get("DB_USER");
		password = Env.get("DB_PASSWORD");
	}
	
	public static Connection getConnection() throws Exception {
		System.out.println("========get connection");
		Class.forName(driver);
		return DriverManager.getConnection(url, user, password);
	}
	
	public static void close(Connection con, Statement smt, ResultSet rs) throws SQLException {
		if (rs != null) {
			rs.close();
		}
		if (smt != null) {
			smt.close();
		}
		if (con != null) {
			con.close();
		}
	}
	
	public static void main(String[] args) throws Exception {
		DBUtil.getConnection();
	}
}

