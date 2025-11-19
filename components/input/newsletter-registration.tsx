"use client"
import { useRef, FormEvent , useContext } from 'react';

// Assuming classes is a CSS module import
import classes from './newsletter-registration.module.css';
import NotificationContext from '@/store/notification-context';
function NewsletterRegistration() {
  // 1. Type useRef for an HTMLInputElement
  // It can be null initially, but will hold an HTMLInputElement after rendering.
  const emailInputRef = useRef<HTMLInputElement>(null);
const notificationCtx = useContext(NotificationContext)
  // 2. Type the event as FormEvent from React
  async function registrationHandler(event: FormEvent) {
    event.preventDefault();

    // Safely check if the ref current value exists before accessing .value
    const enteredEmail = emailInputRef.current?.value;

notificationCtx.showNotification({
  title:"Signing up...",
  message : "Registering for newsletter",
  status : "pending"
})


    // Optional: Add a check to ensure email is present before fetching
    if (!enteredEmail) {
        console.error("Email input is empty.");
        return;
    }

    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify({ email: enteredEmail }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        notificationCtx.showNotification({
          title : "Success!",
          message: "Successfully registered",
          status:"success"
        })

        // 3. Handle non-ok responses (e.g., 400 or 500)
        if (!response.ok) {
            // Get the JSON data for more specific error message if available
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed.');
        }

        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        // Handle network errors or errors thrown from the response check
        console.error("Submission Error:", error);
        notificationCtx.showNotification({
          title:"Error!",
          message:"Registration Failed",
          status : "error"
        })
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            // Assigning the ref to the HTML input element
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;