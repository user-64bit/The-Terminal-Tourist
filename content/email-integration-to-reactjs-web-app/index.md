---
title: "Email Integration in React.js: A Sarcastic Tale"
date: "2024-04-21"
tooltip: "So you don't want to use a backend but still need some backend functionality"
author: "Arth Prajapati"
---

Hello and welcome to a new blog post! Today, we'll find out how to do some backend stuff without writing any backend code. **🎵suspicious sound plays in the background** 👀

In today's post, we'll integrate an email service into our React web app. Because who doesn't love a good ol' email these days? 📧

<p align="center">
    <img src="https://c.tenor.com/J8GV21cQO3QAAAAd/tenor.gif" alt="Celebration GIF"/>
</p>

There are plenty of ways to integrate an email service into your React.js application, but today, we're going to dive into `emailjs`. So, what the heck is `emailjs`? (Spoiler alert: it's not a new JavaScript framework that will make you a millionaire overnight. Sorry, folks!)

### What is EmailJS?

`emailjs` is an SDK that provides us with a ton of functionality to help us manage and integrate an email service into our React application. Exciting, right? 🎉 (Or not, depending on how much you love dealing with email services.)

Before we get started, let's make sure we have everything set up properly. Because we all know how much fun it is to troubleshoot a broken setup. 🤯

### Prerequisites

Before we start working with `emailjs`, we need to create a React project if we don't already have one. If you're just testing `emailjs`, you can use Create React App (CRA) to quickly spin up a new project. Because who doesn't love a good old `npx create-react-app my-app` followed by hours of configuring dependencies? 🙃

### Setting Up EmailJS

Now, let's integrate `emailjs` into our project! Follow these steps carefully, or you might end up sending emails to your ex instead of your customers. (Just kidding... or am I?)

1. **Create an Account on EmailJS.com**

Head over to [EmailJS.com](https://www.emailjs.com) and create a new account. Don't worry, they won't ask for your social security number or your first-born child. (At least, not yet.)

2. **Add a New Email Service**

After creating your account, go to the "Email Services" section and click on "Add New Service". Select Gmail (or whichever email service you want to use), then click "Connect Account" and connect one of your Gmail accounts to it. Finally, click "Create Service".

Congratulations! 🎉 You've already completed half of the work. (The other half is trying to figure out why your emails keep going to spam.)

3. **Install the EmailJS Package**

Now, we'll need to install the `emailjs` package in our project. You can do this using one of the following commands:

```bash
# Using npm
npm install --save @emailjs/browser

# Using Yarn
yarn add @emailjs/browser

# Using Bun
bun add @emailjs/browser
```

Ah, yes, the age-old question: npm, yarn, or bun? Choose wisely, for your project's fate hangs in the balance. (Just kidding, they all pretty much do the same thing.)

4. **Grab the Keys**

We'll need three keys:

1. Service ID (Go to Email Services, and you'll find this one)
2. Template ID (Don't worry about this one right now, we'll get to it)
3. Public Key (Go to Account, and you'll find this one)

**NOTE**: Now add these keys to `.env` in your project and don't forget to add `.env` to `.gitignore`. Because who doesn't love a good ol' security vulnerability? 🔐

I guess now we're done with the setting up part. Time to do some coding! 😤 (Or, you know, just copy and paste from Stack Overflow like the rest of us.)

Now, as you can understand, for sending emails from our website to us (or to your customers, if you're into that sort of thing), we'll need a `form`. So, let's create one.

Create a component named `EmailService.js`:

```jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EmailService = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                process.env.REACT_APP_SERVICE_ID, // Service ID
                process.env.REACT_APP_TEMPLATE_ID, // Template ID (In Next step we'll get this)
                form.current,
                {
                    publicKey: process.env.REACT_APP_PUBLIC_KEY, // Public key
                }
            )
            .then(
                () => {
                    alert("SUCCESS");
                },
                (error) => {
                    alert("FAILED");
                }
            );
        setEmail("");
        setMessage("");
        setName("");
        setIsOpen(false);
    };
    return (
        <>
            <form onSubmit={handleSubmit} ref={form}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-bold mb-2">
                        Name/Nick Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-400 p-2 rounded text-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-400 p-2 rounded text-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block font-bold mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-gray-400 p-2 rounded text-black"
                        required
                    ></textarea>
                </div>
                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="bg-black border hover:bg-white hover:text-black transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                        Send
                    </button>
                    <button
                        className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
};

export default EmailService;
```

**NOTE**: I'm using Tailwind CSS, so if you want to use it too, follow these [steps](https://tailwindcss.com/docs/guides/create-react-app). Don't worry about the code I've written; I've just done a little too much designing. 😆 (Because who doesn't love spending hours tweaking CSS instead of writing actual functionality?)

Now, you must be thinking, "WTH is `useRef()`?" That's the React.js thing, so if you want to learn more about it, go [here](https://react.dev/reference/react/useRef). (Or, you know, just trust that it works and move on.)

In the above code (and for this blog), we only care about the `handleSubmit` function. So, what the hell is going on there?

`emailjs.sendForm` takes four arguments:

```javascript
emailjs.sendForm(serviceID, templateID, templateParams, options);
```

`form.current` will give a reference to the form, so we're passing it as the `templateParams` argument.

Now, let's get that elusive Template ID.

Go to [emailjs.com](https://www.emailjs.com) and click on "Email Templates," and create a template. Modify the email templates as per your need. (Dynamic variables used in the template are just the `name` of the input tags we've created in the form, so if you see something like `{{username}}`, then `username` should be the name of any input tag in your form.)

We can do something like this:

Subject:

```jsx
{{name}} waved at you
```

Body:

```jsx
Hello,

You got a new message from {{name}}:

{{message}}

Best wishes,
```

We'll get the above email every time a user submits the form from the website. Now, go to the "Settings" and change the name of the template (e.g., "Test Template") and grab the `Template ID`.

Before moving forward, make sure that the `To Email` (your email) and `From Name` (`{{name}}`) are set correctly. Because who doesn't love receiving emails from "Undefined Undefined"? 🤷‍♂️

Now, there's one more thing we can do here. Suppose every time a user submits the form, we'll get notify(email) about it. What if we want to reply to the user, thanking them for visiting our website and blah, blah, blah?

For that, we need to create a new template.

Subject:

```jsx
Thank You {{name}}
```

Body:

```jsx
Hi {{name}}

Thank you for checking out our website.

Regards,

Team [Name this sh*t]
```

Here, the `To Email` will be `{{email}}`.

Now, to set this email as an automatic reply, go to the "Test Template" and then go to "Auto Reply," and select the newly created template for it.

TADA! 🥳 Everything is set up. You've integrated an email service into your website. (Now, sit back and watch the emails roll in... or not.)

Well, there you have it, folks! You've just learned how to integrate an email service into your React application using `emailjs`. I hope this blog post was helpful and entertaining (or at least more entertaining than reading the official documentation).

If you managed to follow along without pulling your hair out, congratulations! You're one step closer to becoming a full-stack developer without actually writing any backend code. 🎉

Now, go forth and spam your users with emails they never asked for! Just kidding... or am I? 😈
