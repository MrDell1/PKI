package com.example.lab1;

import java.io.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.util.Collection;
import java.util.Collections;
import java.util.Vector;
import java.util.Iterator;
@WebServlet(name = "chatServlet", value = "/chat")
public class ChatServlet extends HttpServlet {
    Collection<String> tab = Collections.synchronizedCollection(new Vector<String>());
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
            String par=request.getParameter("tekst");
            if (par!=null) tab.add(par);
            Iterator<String> it=tab.iterator();
            while (it.hasNext()) {
                out.println(it.next()+"<br/>");
            }
            out.println("<META HTTP-EQUIV=Refresh CONTENT='10'>");
            out.println("<form method=\"post\">");
            out.println("<input name=\"tekst\" type=\"text\"/>");
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