package kz.qsport;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by yerganat on 2/8/15.
 */
public class RedirectFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
            HttpServletRequest req = (HttpServletRequest) request;

            String escapedFragmentValue = req.getParameter("_escaped_fragment_");
            if(escapedFragmentValue != null){
                RequestDispatcher dispatcher =  request.getRequestDispatcher("/rest/google");
                dispatcher.forward(request, response);
            }

            chain.doFilter(request,response);
    }

    @Override
    public void destroy() {

    }
}
