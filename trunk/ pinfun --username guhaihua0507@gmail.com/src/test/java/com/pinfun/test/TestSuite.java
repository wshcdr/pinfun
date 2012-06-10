package com.pinfun.test;

import java.lang.reflect.Method;  
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import static org.junit.Assert.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.pinfun.db.DBUtil;
import com.pinfun.db.SqlBuilder;

import com.pinfun.model.User;

public class TestSuite {

	
	@Before
	public void Init(){

	
	}
	
	@Test
	public void ConnTest(){
		String sql = "select * from T_USER where NAME = ?";
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			con = DBUtil.getConnection();
			pst = con.prepareStatement(sql);
			pst.setString(1, "name");
			rs = pst.executeQuery();
			if (rs.next()) {
				User u = new User();
				u.setId(rs.getLong("ID"));
				u.setName(rs.getString("NAME"));
				u.setPassword(rs.getString("PWD"));
				u.setType(rs.getString("TYPE"));
				u.setCreateTime(rs.getTimestamp("CREATE_TM"));
				//return u;
				
				assertEquals(u.getType(), "type");
			}
			//return null;
		} catch (Exception e) {
			//throw e;
			System.out.println(e.getMessage());
		} finally {
			try {
				DBUtil.close(con, pst, rs);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
