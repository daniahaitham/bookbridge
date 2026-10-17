# BookBridge
A full-stack web application for managing and sharing books.  

# Key Features
A full-stack web application for managing and sharing books.  

#### For Users
- 👤 **Authentication**: Sign up, log in, and log out securely.
- 📚 **Book management**: Add books to offer, edit them, or delete them.
- 📂 **My Offered Books**: View and manage only the books you personally offered.
- 🔍 **Browse books**: Scroll through books offered by other users.
- 📖 **Book details**: Open a detailed page for any book.
- 🔄 **Requests**: 
  - Send requests to borrow or exchange books from other users.
  - Track incoming requests for your books and accept or reject them.
  - Track your own outgoing requests with status updates.
- 📝 **Complaints**: Submit complaints directly to the admins.

#### For Admins
- 🛠️ **Book moderation**: Edit or delete any book (from the details page or directly from the home page).
- 📊 **Statistics**: View application statistics and insights.
- 📬 **Complaint management**: See all user complaints and mark them as resolved.



# 3ed party API 
This project integrates with the **Quotable API** to display a fresh quote at the top of the homepage. 
- Endpoint used: `GET https://api.quotable.io/quotes/random?tags=inspirational`
- Purpose:  Shows book-related or inspirational quotes to make the homepage more engaging.
- Fallback: If the API fails, a default message is displayed: *“Keep turning pages. Every chapter counts.”*

# Broject runs on 
**http://localhost:5173**
