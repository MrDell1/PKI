package com.example.lab1;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "inputServlet", value = "/input")
public class InputServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request, response);
    }

    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        String dataLancuch = dateFormat.format(date);
        try{
            out.println("<h1>" + dataLancuch + "</h1><br>");
            out.println("<form method=\"get\" action=\"printServlet\">");
            out.println("<input name=\"fname\" type=\"text\"/>");
            out.println("<input type=\"submit\"/>");
            out.println("</form>");
            out.println("<a href=\"/Lab1_war_exploded/\">Powrót do strony głównej</a>");
        }
        finally {
            out.close();
        }

    }

    public void destroy() {
    }
}