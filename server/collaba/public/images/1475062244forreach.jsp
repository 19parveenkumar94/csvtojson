<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
      <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
      <%@ page import="java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<% ArrayList<String> ll=new ArrayList<String>();
ll.add("hello");
ll.add(" everyone");
ll.add(" how");
ll.add(" yo doing");


%>
<c:forEach items="${ll}" var="l" varStatus="status">
<c:out value="${l}" ></c:out>
</c:forEach>
</body>
</html>