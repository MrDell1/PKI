package com.example.lab1;

import java.io.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "printServlet", value = "/print")
public class PrintServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request, response);
    }

    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try{
            out.println("<h1>Cześć " + request.getParameter("fname") + "</h1><br>");
            out.println("<a href=\"inputServlet\">Powrót</a>");
        }
        finally {
            out.close();
        }

    }

    public void destroy() {
    }
}