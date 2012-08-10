package com.pinfun.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pinfun.model.DaoFactory;
import com.pinfun.model.User;
import com.pinfun.model.dao.UserDao;

//import com.pinfun.model.dao.userDaoEx;


import javax.servlet.*;


  
/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

 
	 
	protected void service(HttpServletRequest request, HttpServletResponse response) 
	throws ServletException, IOException 
	{
			
		//String userName = request.getParameter("name");
		//String password = request.getParameter("password");
		String userName = "name";
		UserDao dao = DaoFactory.getUserDao();
		

		try {
			User u = dao.getUser(userName);
			
			
			if (u != null && u.getPassword().equals("password")) {
				request.getSession().setAttribute("USER", u);
				response.sendRedirect("Index.jsp");
			} else {
				request.setAttribute("errorMsg", "password is not correct");
				//request.getRequestDispatcher("login.jsp").forward(request, response);
				response.sendRedirect("login.jsp");
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
