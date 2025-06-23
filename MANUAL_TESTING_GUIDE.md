# 🧪 Manual Testing Guide - Blood Management System

## 🚀 Quick Start Testing

### **Server Status Check**
✅ **Development Server**: Running on `http://localhost:5175`  
✅ **Status**: Active and ready for testing

---

## 📋 **Test Scenarios**

### **1. Authentication Flow Testing** 🔐

#### Test 1.1: Admin Login
```
Step 1: Go to http://localhost:5175/login
Step 2: Enter email: admin@lifestream.com
Step 3: Enter password: admin123  
Step 4: Click "Sign In"

Expected Results:
✅ Success message appears
✅ Redirects to /admin/dashboard
✅ Dashboard loads with admin information
✅ User dropdown shows admin email
```

#### Test 1.2: User Login  
```
Step 1: Go to http://localhost:5175/login
Step 2: Enter email: user@lifestream.com
Step 3: Enter password: user123
Step 4: Click "Sign In"

Expected Results:
✅ Success message appears  
✅ Redirects to / (homepage)
✅ User is logged in (check localStorage)
```

#### Test 1.3: Invalid Login
```
Step 1: Go to http://localhost:5175/login
Step 2: Enter email: wrong@email.com
Step 3: Enter password: wrongpass
Step 4: Click "Sign In"

Expected Results:
✅ Error message: "Invalid email or password!"
✅ Stays on login page
✅ No redirect occurs
```

### **2. Route Protection Testing** 🛡️

#### Test 2.1: Direct Admin Access (Not Logged In)
```
Step 1: Clear browser data (or use incognito)
Step 2: Go to http://localhost:5175/admin/dashboard

Expected Results:
✅ Automatically redirects to /login
✅ Dashboard is not accessible
✅ URL changes to /login
```

#### Test 2.2: Admin Access After Login
```
Step 1: Login as admin (admin@lifestream.com/admin123)
Step 2: Navigate to http://localhost:5175/admin/dashboard

Expected Results:
✅ Dashboard loads successfully
✅ Statistics cards display
✅ Navigation sidebar visible
✅ User info shows in header
```

#### Test 2.3: Cross-Role Access
```
Step 1: Login as user (user@lifestream.com/user123)  
Step 2: Try to access http://localhost:5175/admin/dashboard

Expected Results:
✅ Redirects to / (homepage)
✅ Admin dashboard not accessible
✅ User role restrictions enforced
```

### **3. Navigation Testing** 🧭

#### Test 3.1: Header Navigation
```
Step 1: Go to http://localhost:5175/news
Step 2: Check header elements

Expected Results:
✅ Header is visible at top
✅ Logo/brand name displayed  
✅ Navigation menu items present
✅ Login/Register buttons visible
```

#### Test 3.2: News Page Layout
```
Step 1: Go to http://localhost:5175/news

Expected Results:
✅ Header displayed
✅ News articles in grid layout
✅ Footer displayed at bottom
✅ Articles are clickable
✅ Responsive design works
```

#### Test 3.3: Admin Navigation
```  
Step 1: Login as admin
Step 2: Access admin dashboard
Step 3: Test sidebar navigation

Expected Results:
✅ Sidebar menu visible
✅ Menu items clickable
✅ Active menu highlighting
✅ Donor List accessible
✅ Add Donor accessible
```

### **4. Error Handling Testing** 🚨

#### Test 4.1: 404 Error Page
```
Step 1: Go to http://localhost:5175/non-existent-page

Expected Results:
✅ Custom error page displays
✅ User-friendly error message
✅ "Go Home" button available
✅ "Go Back" button available
✅ No generic 404 error
```

#### Test 4.2: Route Error Recovery
```
Step 1: Navigate to error page
Step 2: Click "Go Home" button

Expected Results:
✅ Redirects to homepage
✅ Navigation works properly
✅ App state is preserved
```

### **5. Logout Testing** 🚪

#### Test 5.1: Admin Logout
```
Step 1: Login as admin
Step 2: Go to dashboard
Step 3: Click user dropdown
Step 4: Click "Sign out"

Expected Results:
✅ Redirects to /login
✅ localStorage cleared
✅ Dashboard no longer accessible
✅ Must login again to access admin
```

### **6. Data Persistence Testing** 💾

#### Test 6.1: Session Persistence
```
Step 1: Login as admin
Step 2: Refresh the page (F5)

Expected Results:
✅ User stays logged in
✅ Dashboard still accessible
✅ User info persisted
✅ No re-login required
```

#### Test 6.2: Browser Tab Testing
```
Step 1: Login as admin in one tab
Step 2: Open new tab
Step 3: Go to http://localhost:5175/admin/dashboard

Expected Results:
✅ Dashboard accessible in new tab
✅ Session shared between tabs
✅ No additional login required
```

---

## 🎯 **Expected Final State**

After completing all tests, you should have:

✅ **Working Authentication**: Login/logout functioning  
✅ **Protected Routes**: Admin areas secured  
✅ **Proper Navigation**: Headers/footers on all pages  
✅ **Error Handling**: Custom error pages  
✅ **Data Management**: Donor system operational  
✅ **Responsive Design**: Mobile-friendly interface  

---

## 🐛 **If Something Doesn't Work**

### **Common Issues & Solutions**:

1. **Login redirects to wrong page**:
   - Check localStorage for userRole/userEmail
   - Clear browser data and try again

2. **Header not showing on pages**:
   - Verify Header component is imported and rendered
   - Check console for JavaScript errors

3. **Admin dashboard not accessible**:
   - Ensure you're using correct admin credentials
   - Check if ProtectedRoute is working

4. **404 errors still showing**:
   - Verify ErrorPage component is imported
   - Check if errorElement is set on routes

### **Debug Tools**:
- **Browser DevTools**: Check console for errors
- **Network Tab**: Monitor API requests  
- **Application Tab**: Check localStorage values
- **React DevTools**: Inspect component state

---

**Testing Status**: 🧪 Ready for comprehensive testing  
**Last Updated**: June 14, 2025  
**Server URL**: http://localhost:5175
