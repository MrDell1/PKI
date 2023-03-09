package com.example.lab1;

import java.io.*;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "helloServlet", value = "/")
public class HelloServlet extends HttpServlet {
    private String message;
    private int i=0;
    public void init() {
        message = "Hello World!";
    }

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
            out.println("<h1>Welcome to my first servlet app</h1><br>");
//            out.println("Wynik getMethod "+request.getMethod() + "<br>");
//            out.println("Wynik getRemoteAddr "+request.getRemoteAddr()+ "<br>");
//            out.println("Wynik getServerName "+request.getServerName()+ "<br>");
//            out.println("Wynik getHeader(\"Accept\")"+request.getHeader("Accept")+ "<br>");
//            out.println("Wynik getHeader(\"Accept-Language\")"+request.getHeader("Accept-Language")+ "<br>");
//            out.println("Wynik getHeader(\"Accept-Encoding\")"+request.getHeader("Accept-Encoding")+ "<br>");
//            out.println("Wynik getHeader(\"User-Agent\")"+request.getHeader("User-Agent")+ "<br>");
//            int x = Integer.parseInt(request.getParameter("x"));
//            int y = Integer.parseInt(request.getParameter("y"));
//            int sum = x + y;
//            out.println("Wynik dodawania " + request.getParameter("x") + "+" + request.getParameter("y") + "=" + sum + "<br>");

            i+=1;
            out.println("Licznik: " + i);
            HttpSession session = request.getSession(true);
            Boolean loggedIn = (Boolean) session.getAttribute("zalogowany");
            if(loggedIn == null){
                loggedIn = false;
            }
            if(loggedIn){
                out.println("<h3>Zalogowany</h3>");
            }
            else{
                out.println("<form method=\"get\">");
                out.println("<input type=\"text\"/>");
                out.println("<input type=\"password\"/>");
                out.println("<input type=\"submit\">/");
                out.println("</form>");
            }
        }
        finally {
            out.close();
        }

    }

    public void destroy() {
    }
}