const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const userInput = input.toLowerCase();


let isResponding = false; // Flag to check if the assistant is currently responding

// Function to speak text with a specific voice
function speak(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    
    // Set speech parameters
    utterThis.rate = 1;
    utterThis.volume = 1;
    utterThis.pitch = 1;

    // Get available voices
    const voices = synth.getVoices();

    // Choose a female or Indian English voice if available
    let selectedVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Indian English'));

    // If no specific voice found, fallback to default voice
    if (!selectedVoice) {
        selectedVoice = voices[0];
    }

    utterThis.voice = selectedVoice;

    // Event to detect when the speech ends
    utterThis.onend = () => {
        isResponding = false; // Reset the flag when response ends
    };

    // Start speaking
    synth.speak(utterThis);

    isResponding = true; // Set the flag to indicate the assistant is responding
}

// Function to greet based on the time of day
function wishMe() {
    const day = new Date();
    const hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Initialize the assistant on page load
window.addEventListener('load', () => {
    speechSynthesis.onvoiceschanged = () => {
        speak("Initializing SHARMA A. I.");
        wishMe();
    };
});

// Check for browser compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    content.textContent = "Speech recognition not supported in this browser.";
    alert("Speech recognition is not supported in this browser. Please use a compatible browser.");
}

// Create a new instance of SpeechRecognition
const recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

    // Stop recognition after processing the command
    recognition.stop();
};

recognition.onspeechend = () => {
    recognition.start();
};

recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    recognition.start();
};

// Start listening when the button is clicked
btn.addEventListener('click', () => {
    if (isResponding) {
        // Immediately stop any ongoing speech
        window.speechSynthesis.cancel(); // Stop the current speech
        isResponding = false; // Reset the flag
    }
    
    content.textContent = "Listening...";
    recognition.start();
});

// Social network links
const socialLinks = {
    github: "https://github.com/Hugs-4-Bugs",
    linkedin: "https://www.linkedin.com/in/prabhat-kumar-6963661a4/",
    naukri: "https://www.naukri.com/mnjuser/profile?id=&altresid",
    stackoverflow: "https://stackoverflow.com/users/19520484/prabhat-kumar",
    instagram: "https://www.instagram.com/_s_4_sharma/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D",
    twitter: "https://twitter.com/kattyPrabhat",
    geeksforgeeks: "https://auth.geeksforgeeks.org/user/prabhatkueazc/practice",
    hackerrank: "https://www.hackerrank.com/Prabhat_7250",
    leetcode: "https://leetcode.com/Hugs-2-Bugs/",
    resume: "https://hugs-4-bugs.github.io/myResume/"
};

// Function to handle opening social network links
function openSocialLink(platform) {
    const url = socialLinks[platform.toLowerCase()];
    if (url) {
        window.open(url, '_blank');
        speak(`Opening ${platform} profile.`);
    } else {
        speak("Social network not recognized.");
    }
}

// Basic questions to handle
const basicQuestions = [
        "hi", "hello", "good morning", "good afternoon", "good evening", "thank you", "education", "skill", "skills", "experience", 
        "project", "projects", "name", "from", "where are you from", "tell me about yourself", "how are you", "who are you", 
        "tell me something about prabhat", "who is prabhat", "who is prabhat kumar", "tell me more about prabhat", "tell me something about Prabhat", 
        "tell me about Prabhat", "who am i", "who do you think i am", "tell me about me", "what do you think about me", "can you tell me about myself",
        "what skills do you have", "what is your education", "what is your experience","experience", "what languages do you speak", 
        "what certifications do you have", "what projects have you worked on", "what tools are you proficient with", 
        "what programming languages are you familiar with", "what web technologies are you experienced in", "hobby", 
        "what cloud technologies have you worked with", "what databases are you skilled in", 
        "what version control systems do you use", "what frameworks are you comfortable with", 
        "what operating systems are you familiar with", "what development tools do you prefer", 
        "what is your favorite programming language", "what is your preferred ide", "what are your hobbies", 
        "what motivates you","what motivate you", "what are your career goals","skills", "my skills", "please tell me your skills", "skills you possess", 
        "education", "your education", "what is your educational background", "your educational qualifications",
        "experience", "your experience", "experience details", "how much experience do you have",
        "languages spoken", "languages you speak", "what languages are you fluent in", "languages you can speak",
        "certifications", "certificates", "certificates you hold", "hobbie", "interest",
        "projects", "work on", "projects you've worked on", "projects you've been involved with",
        "tools", "tools you use", "tools you are familiar with", "tools you know how to use",
        "programming languages", "languages you code in", "programming languages you're familiar with",
        "web technologies", "web tech", "web technologies you're experienced with",
        "cloud technologies", "cloud tech", "cloud technologies you know", "databases", "database skills", "database technologies",
        "version control systems", "version control", "version control tools", "version control methods",
        "frameworks", "frameworks you're comfortable with", "frameworks you're experienced in",
        "operating systems", "OS", "operating systems you know", "which OS do you use",
        "development tools", "dev tools", "development tools you prefer", "your development tools",
        "favorite programming language", "favorite language", "your favorite coding language",
        "preferred ide", "IDE preference", "your preferred development environment", "favorite IDE",
        "hobbies", "interests", "things you enjoy doing",
        "motivations", "your motivation", "what inspires you", "what drives you", "career goal",
        "career goals", "career aspirations", "your professional goal","your professional goals", "future career objectives",
        "what is your phone number", "what's your phone number", "phone number", "your phone number", 
        "can i have your phone number", "can you give me your phone number", "phone no", "phone no.", 
        "what is ur phone number", "what's ur phone number", "ur phone number", "can i get your phone number", 
        "can you share your phone number", "what's your contact number", "contact number", "your contact number", 
        "phone", "PHone", "PHONE", "Phone number", "PHONE NUMBER", "phone Number", "What is your Phone number", 
        "WHAT IS YOUR PHONE NUMBER", "What's your Phone number", "WHAT'S YOUR PHONE NUMBER", "what's your mobile number", 
        "mobile number", "your mobile number", "can i have your mobile number", "can i get your contact number", "can you give me your mobile number", 
        "cell phone number", "your cell phone number", "can i get your cell phone number", "can you share your cell phone number", 
        "phone digits", "your phone digits", "contact phone number", "your contact phone number",
        "what is your email", "what's your email", "email", "your email", "can i have your email", 
        "can you give me your email", "email id", "email address", "what is ur email", "what's ur email", 
        "ur email", "can i get your email", "can you share your email", "what's your email address", 
        "email address", "your email address", "mail", "MAIL", "Email", "EMAIL", "email ID", "EMAIL ID", 
        "What is your Email", "WHAT IS YOUR EMAIL", "What's your Email", "WHAT'S YOUR EMAIL", "what's your email id", 
        "email id", "your email id", "can i have your email id", "can you give me your email id", "email account", 
        "your email account", "can i get your email account", "can you share your email account", "mail id", 
        "your mail id", "contact email", "your contact email", "official email", "your official email", 
        "personal email", "your personal email",  "what database are you most experienced with", "what's your preferred database", "what database do you use most often", 
        "do you have experience with [specific database]", "what's your go-to database", "what database are you skilled in", "what's your database of choice",
        "which database do you like most", "what database do you work with", "what's your favorite database", "what database are you familiar with",
        "what database have you worked with", "what's your database expertise", "what database do you specialize in", "what database are you comfortable with", 
        "What databases are you most experienced with", "what's your preferred databases", "what databases do you use most often", "do you have experience with [specific databases]",
        "what's your go-to databases", "what databases are you skilled in", "what's your databases of choice", "which databases do you like most", "what databases do you work with",
        "what's your favorite databases", "what databases are you familiar with", "what databases have you worked with", "what's your databases expertise", 
        "what databases do you specialize in", "what databases are you comfortable with", "database", "databases", "What databases are you skilled in", "What database are you skilled in",
        "what databases are you skilled in", "what database are you skilled in"
    ];
    

// Function to check if the question is a basic question
function isBasicQuestion(question) {
    return basicQuestions.includes(question.trim());
}

// Function to get a basic response based on the question
function getBasicResponse(question) {
    // Normalize the question
    const normalizedQuestion = question.trim().toLowerCase();
    
    console.log("Normalized Question:", normalizedQuestion); // For debugging

    switch(normalizedQuestion) {
        case "hi":
        case "hello":
            return "Hello! How can I assist you today?";
        case "good morning":
        case "good afternoon":
        case "good evening":
            return `Good ${normalizedQuestion.split(' ')[1]}! How can I assist you today?`;
        case "thank you":
            return "You're welcome!";
        case "education":
            return "I graduated in 2023 with a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University.";
        case "skill":
        case "skills":
            return "I have skills in Java, SQL, Data Structures, Github, Spring Boot, Hibernate, RESTful API, JPA, MySQL,DevOps, Debugging, Angular, AWS, Postman.";
        case "experience":
            return "I have worked on various projects including Java development and AI ML Projects, having experties in Java, SpringBoot, Hibernate, MySQL, Angular, AWS, Postman, REST API, Github.";
        case "name":
            return "My name is SHARMA A. I.";
        case "from":
        case "where are you from":
            return "I am from the digital world.";
        case "who am i":
        case "who do you think i am":
        case "tell me about me":
        case "what do you think about me":
        case "can you tell me about myself":
             return "I don't have personal opinions or information about you, but I'm here to assist you with any questions or tasks you have. I am Prabhat Kumar's assistant.";
        case "tell me about yourself":
            return "I am an AI assistant here to help you with your queries.";
        case "how are you":
            return "I am doing well, thank you!";
        case "who are you":
            return "I am SHARMA A. I., your virtual assistant created by Prabhat Kumar. How can i make you smile today!";
        case "tell me something about prabhat":
        case "who is prabhat":
        case "who is prabhat kumar":
        case "tell me more about prabhat":
        case "tell me something about Prabhat":
        case "tell me about Prabhat":
            return "Prabhat Kumar is a skilled developer with expertise in various technologies.";
        case "what skills do you have":
            return "I have expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, Collection Framework, Exception Handling, Postman, Jira, Jenkins, Chef, Ansible, Git, DevOps, Agile Methodology, Kanban Board, RESTful API, JPA, Debugging, Authentication, AWS Deployment, Problem Solving, Software Development, Backend Development, Java Development, Angular, HTML, CSS, Database.";
        case "what is your education":
            return "I graduated in 2023 with a Bachelor of Engineering degree in Computer Science & Engineering from Visvesvaraya Technological University.";
        case "what is your experience":
        case "experience":
            return "I have less than 1 year of experience working as a software engineer.";
        case "what languages do you speak":
            return "I speak English, Hindi, and Bhojpuri.";
        case "what certifications do you have":
            return "I am HackerRank certified Software Engineer, Postman API Expert, Microsoft Azure AI Cloud.";
        case "what projects have you worked on":
        case "project":
        case "projects":
            return "Notable projects include CryptoCurrency Price Prediction, AI Text Summarizer, Bitcoin Mining App, Angular CRUD Application, and BUDDY - A Face Recognition Based Voice Assistant.";
        case "what tools are you proficient with":
            return "I am proficient with tools like Git, Docker, Android Studio, Jira, Spring Tool Suite (STS), IntelliJ IDEA, Eclipse, VS Code, Postman.";
        case "what programming languages are you familiar with":
            return "I am familiar with Java, TypeScript, and Shell Scripting.";
        case "what web technologies are you experienced in":
            return "I am experienced in Java, Spring Boot, Hibernate, JPA, RESTful APIs, HTML, CSS, and Angular.";
        case "what cloud technologies have you worked with":
            return "I have worked with AWS cloud technologies.";
        case "what databases are you skilled in":
            return "I am skilled in MySQL, SQL, and PostgreSQL.";
        case "what version control systems do you use":
            return "I use Git and Bitbucket for version control.";
        case "what frameworks are you comfortable with":
            return "I am comfortable with Spring, Spring Boot, and Angular frameworks.";
        case "what operating systems are you familiar with":
            return "I am familiar with Windows, Linux, Fedora, Ubuntu, and macOS.";
        case "what development tools do you prefer":
            return "My preferred IDEs are IntelliJ, Eclipse, Spring Tool Suite, and Visual Studio Code.";
        case "what is your favorite programming language":
            return "My favorite programming language is Java.";
        case "what is your preferred ide":
            return "My preferred IDE is IntelliJ IDEA.";
        case "what are your hobbies":
            return "My hobbies include reading, traveling, and F&O + Stock + Crypto + Forex Trading.";
        case "what motivates you":
        case "what motivate you":
            return "I am motivated by challenging projects and opportunities for growth.";
        case "what are your career goals":
            return "My career goals include becoming a senior software engineer and contributing to impactful projects.";
        case "skills":
        case "my skills":
        case "please tell me your skills":
        case "skills you possess":
            return "I have expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, Collection Framework, Exception Handling, Postman, Jira, Jenkins, Chef, Ansible, Git, DevOps, Agile Methodology, Kanban Board, RESTful API, JPA, Debugging, Authentication, AWS Deployment, Problem Solving, Software Development, Backend Development, Java Development, Angular, HTML, CSS, Database.";
        case "your education":
        case "what is your educational background":
        case "your educational qualifications":
            return "I graduated in 2023 with a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University.";
        case "experience":
        case "your experience":
        case "experience details":
        case "how much experience do you have":
            return "I have less than 1 year of experience working as a software engineer.";
        case "languages spoken":
        case "languages you speak":
        case "what languages are you fluent in":
        case "languages you can speak":
            return "I speak English, Hindi, and Bhojpuri.";
        case "certifications":
        case "certificates":
        case "certificates you hold":
            return "I am HackerRank certified Software Engineer, Postman API Expert, Microsoft Azure AI Cloud.";
        case "projects":
        case "work on":
        case "projects you've worked on":
        case "projects you've been involved with":
            return "Notable projects include CryptoCurrency Price Prediction, AI Text Summarizer, Bitcoin Mining App, Angular CRUD Application, and BUDDY - A Face Recognition Based Voice Assistant.";
        case "tools":
        case "tools you use":
        case "tools you are familiar with":
        case "tools you know how to use":
            return "I am proficient with tools like Git, Docker, Android Studio, Jira, Spring Tool Suite (STS), IntelliJ IDEA, Eclipse, VS Code, Postman.";
        case "programming languages":
        case "languages you code in":
        case "programming languages you're familiar with":
            return "I am familiar with Java, TypeScript, and Shell Scripting.";
        case "web technologies":
        case "web tech":
        case "web technologies you're experienced with":
            return "I am experienced in Java, Spring Boot, Hibernate, JPA, RESTful APIs, HTML, CSS, and Angular.";
        case "cloud technologies":
        case "cloud tech":
        case "cloud technologies you know":
            return "I have worked with AWS cloud technologies.";
        case "databases":
        case "database skills":
        case "database technologies":
            return "I am skilled in MySQL, SQL, and PostgreSQL.";
        case "version control systems":
        case "version control":
        case "version control tools":
        case "version control methods":
            return "I use Git and Bitbucket for version control.";
        case "frameworks":
        case "frameworks you're comfortable with":
        case "frameworks you're experienced in":
            return "I am comfortable with Spring, Spring Boot, and Angular frameworks.";
        case "operating systems":
        case "OS":
        case "operating systems you know":
        case "which OS do you use":
            return "I am familiar with Windows, Linux, Fedora, Ubuntu, and macOS.";
        case "development tools":
        case "dev tools":
        case "development tools you prefer":
        case "your development tools":
            return "My preferred IDEs are IntelliJ, Eclipse, Spring Tool Suite, and Visual Studio Code.";
        case "favorite programming language":
        case "favorite language":
        case "your favorite coding language":
            return "My favorite programming language is Java.";
        case "preferred ide":
        case "IDE preference":
        case "your preferred development environment":
        case "favorite IDE":
            return "My preferred IDE is IntelliJ IDEA.";
        case "hobbies":
        case "hobbie":
        case "hobby":
        case "interests":
        case "interest":
        case "things you enjoy doing":
            return "My hobbies include reading, traveling, and Future and Option, Stock, Crypto, and Forex Trading.";
        case "motivations":
        case "your motivation":
        case "what inspires you":
        case "what drives you":
            return "I am motivated by challenging projects and opportunities for growth.";
        
        case "career goals":
        case "career goal":
        case "career aspirations":
        case "your professional goals":
        case "your professional goal":
        case "future career objectives":
            return "My career goals include becoming a senior software engineer and contributing to impactful projects.";
        case "what is your phone number":
        case "what's your phone number":
        case "phone number":
        case "your phone number":
        case "can i have your phone number":
        case "can you give me your phone number":
        case "phone no":
        case "phone no.":
        case "what is ur phone number":
        case "what's ur phone number":
        case "ur phone number":
        case "can i get your phone number":
        case "can i get your contact number":
        case "can you share your phone number":
        case "what's your contact number":
        case "contact number":
        case "your contact number":
        case "phone":
        case "PHone":
        case "PHONE":
        case "Phone number":
        case "PHONE NUMBER":
        case "phone Number":
        case "What is your Phone number":
        case "WHAT IS YOUR PHONE NUMBER":
        case "What's your Phone number":
        case "WHAT'S YOUR PHONE NUMBER":
        case "what's your mobile number":
        case "mobile number":
        case "your mobile number":
        case "can i have your mobile number":
        case "can you give me your mobile number":
        case "cell phone number":
        case "your cell phone number":
        case "can i get your cell phone number":
        case "can you share your cell phone number":
        case "phone digits":
        case "your phone digits":
        case "contact phone number":
        case "your contact phone number":
            return "Here is my contact number 7 2 5 zero zero 6 3 2 zero 6";  

        case "what is your email":
        case "what's your email":
        case "email":
        case "your email":
        case "can i have your email":
        case "can you give me your email":
        case "email id":
        case "email address":
        case "what is ur email":
        case "what's ur email":
        case "ur email":
        case "can i get your email":
        case "can you share your email":
        case "what's your email address":
        case "email address":
        case "your email address":
        case "mail":
        case "MAIL":
        case "Email":
        case "EMAIL":
        case "email ID":
        case "EMAIL ID":
        case "What is your Email":
        case "WHAT IS YOUR EMAIL":
        case "What's your Email":
        case "WHAT'S YOUR EMAIL":
        case "what's your email id":
        case "email id":
        case "your email id":
        case "can i have your email id":
        case "can you give me your email id":
        case "email account":
        case "your email account":
        case "can i get your email account":
        case "can you share your email account":
        case "mail id":
        case "your mail id":
        case "contact email":
        case "your contact email":
        case "official email":
        case "your official email":
        case "personal email":
        case "your personal email":
            return "Here is my email P r a b h a t k u m a r s s m 7 2 @ gmail.com"; 

        case "what database are you most experienced with":
        case "what's your preferred database":
        case "what database do you use most often":
        case "do you have experience with [specific database]":
        case "what's your go-to database":
        case "what database are you skilled in":
        case "what's your database of choice":
        case "which database do you like most":
        case "what database do you work with":
        case "what's your favorite database":
        case "what database are you familiar with":
        case "what database have you worked with":
        case "what's your database expertise":
        case "what database do you specialize in":
        case "what database are you comfortable with":
        case "What databases are you most experienced with":
        case "what's your preferred databases":
        case "what databases do you use most often":
        case "do you have experience with [specific databases]":
        case "what's your go-to databases":
        case "what databases are you skilled in":
        case "What databases are you skilled in":
        case "what databases are you skilled in":
        case "What database are you skilled in":
        case "what database are you skilled in":
        case "what's your databases of choice":
        case "which databases do you like most":
        case "what databases do you work with":
        case "what's your favorite databases":
        case "what databases are you familiar with":
        case "what databases have you worked with":
        case "what's your databases expertise":
        case "what databases do you specialize in":
        case "what databases are you comfortable with":
        case "database":
        case "databases":
            return "I am skilled in MySQL, SQL, and PostgreSQL.";
        default:
            return "I'm not sure about that. Can you ask something else?";
    }

//  same but duplicates are removed //


// switch(normalizedQuestion) {
//     case "hi":
//     case "hello":
//         return "Hello! How can I assist you today?";
//     case "good morning":
//     case "good afternoon":
//     case "good evening":
//         return `Good ${normalizedQuestion.split(' ')[1]}! How can I assist you today?`;
//     case "thank you":
//         return "You're welcome!";
//     case "education":
//     case "your education":
//     case "what is your educational background":
//     case "your educational qualifications":
//         return "I graduated in 2023 with a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University.";
//     case "skill":
//     case "skills":
//     case "what skills do you have":
//     case "my skills":
//     case "please tell me your skills":
//     case "skills you possess":
//         return "I have expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, Collection Framework, Exception Handling, Postman, Jira, Jenkins, Chef, Ansible, Git, DevOps, Agile Methodology, Kanban Board, RESTful API, JPA, Debugging, Authentication, AWS Deployment, Problem Solving, Software Development, Backend Development, Java Development, Angular, HTML, CSS, Database.";
//     case "experience":
//     case "your experience":
//     case "experience details":
//     case "how much experience do you have":
//         return "I have less than 1 year of experience working as a software engineer.";
//     case "name":
//         return "My name is SHARMA A. I.";
//     case "from":
//     case "where are you from":
//         return "I am from the digital world.";
//     case "who am i":
//     case "who do you think i am":
//     case "tell me about me":
//     case "what do you think about me":
//     case "can you tell me about myself":
//         return "I don't have personal opinions or information about you, but I'm here to assist you with any questions or tasks you have. I am Prabhat Kumar's assistant.";
//     case "tell me about yourself":
//         return "I am an AI assistant here to help you with your queries.";
//     case "how are you":
//         return "I am doing well, thank you!";
//     case "who are you":
//         return "I am SHARMA A. I., your virtual assistant.";
//     case "tell me something about prabhat":
//     case "who is prabhat":
//     case "who is prabhat kumar":
//     case "tell me more about prabhat":
//         return "Prabhat Kumar is a skilled developer with expertise in various technologies.";
//     case "what languages do you speak":
//     case "languages spoken":
//     case "what languages are you fluent in":
//     case "languages you can speak":
//         return "I speak English, Hindi, and Bhojpuri.";
//     case "certifications":
//     case "certificates":
//     case "certificates you hold":
//         return "I am HackerRank certified Software Engineer, Postman API Expert, Microsoft Azure AI Cloud.";
//     case "projects":
//     case "project":
//     case "work on":
//     case "projects you've worked on":
//     case "projects you've been involved with":
//         return "Notable projects include CryptoCurrency Price Prediction, AI Text Summarizer, Bitcoin Mining App, Angular CRUD Application, and BUDDY - A Face Recognition Based Voice Assistant.";
//     case "tools":
//     case "tools you use":
//     case "tools you are familiar with":
//     case "tools you know how to use":
//         return "I am proficient with tools like Git, Docker, Android Studio, Jira, Spring Tool Suite (STS), IntelliJ IDEA, Eclipse, VS Code, Postman.";
//     case "programming languages":
//     case "languages you code in":
//     case "programming languages you're familiar with":
//         return "I am familiar with Java, TypeScript, and Shell Scripting.";
//     case "web technologies":
//     case "web tech":
//     case "web technologies you're experienced with":
//         return "I am experienced in Java, Spring Boot, Hibernate, JPA, RESTful APIs, HTML, CSS, and Angular.";
//     case "cloud technologies":
//     case "cloud tech":
//     case "cloud technologies you know":
//         return "I have worked with AWS cloud technologies.";
//     case "databases":
//     case "database skills":
//     case "database technologies":
//         return "I am skilled in MySQL, SQL, and PostgreSQL.";
//     case "version control systems":
//     case "version control":
//     case "version control tools":
//     case "version control methods":
//         return "I use Git and Bitbucket for version control.";
//     case "frameworks":
//     case "frameworks you're comfortable with":
//     case "frameworks you're experienced in":
//         return "I am comfortable with Spring, Spring Boot, and Angular frameworks.";
//     case "operating systems":
//     case "OS":
//     case "operating systems you know":
//     case "which OS do you use":
//         return "I am familiar with Windows, Linux, Fedora, Ubuntu, and macOS.";
//     case "development tools":
//     case "dev tools":
//     case "development tools you prefer":
//     case "your development tools":
//         return "My preferred IDEs are IntelliJ, Eclipse, Spring Tool Suite, and Visual Studio Code.";
//     case "favorite programming language":
//     case "favorite language":
//     case "your favorite coding language":
//         return "My favorite programming language is Java.";
//     case "preferred ide":
//     case "IDE preference":
//     case "your preferred development environment":
//     case "favorite IDE":
//         return "My preferred IDE is IntelliJ IDEA.";
//     case "hobbies":
//     case "interests":
//     case "things you enjoy doing":
//         return "My hobbies include reading, traveling, and F&O + Stock + Crypto + Forex Trading.";
//     case "motivations":
//     case "your motivation":
//     case "what inspires you":
//     case "what drives you":
//         return "I am motivated by challenging projects and opportunities for growth.";
//     case "career goals":
//     case "career goal":
//     case "career aspirations":
//     case "your professional goals":
//     case "your professional goal":
//     case "future career objectives":
//         return "My career goals include becoming a senior software engineer and contributing to impactful projects.";
//     default:
//         return "I'm not sure about that. Can you ask something else?";
// }

}


// Enhanced function to handle user commands
function takeCommand(message) {
    // Handle basic questions
    if (isBasicQuestion(message)) {
        speak(getBasicResponse(message));
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } 
    // Handle social network profiles with alternative phrasing
    else if (message.includes("linkedin") || message.includes("linkedin profile") || 
             message.includes("his linkedin") || message.includes("prabhat's linkedin") ||
             message.includes("see linkedin") || message.includes("explore linkedin") ||
             message.includes("i want to see his linkedin") || message.includes("i want to explore his linkedin") ||
             message.includes("i want to see prabhat's linkedin") || message.includes("i want to explore prabhat's linkedin")) {
        openSocialLink("linkedin");
    } else if (message.includes("leetcode") || message.includes("leetcode profile") || message.includes("leet code profile") ||
             message.includes("his leetcode") || message.includes("prabhat's leetcode") ||
             message.includes("see leetcode") || message.includes("explore leetcode") || message.includes("show me lit code profile") ||
             message.includes("i want to see his leetcode") || message.includes("i want to explore his leetcode") ||
             message.includes("i want to see prabhat's leetcode") || message.includes("i want to explore prabhat's leetcode")) {
        openSocialLink("leetcode");
    } else if (message.includes("github") || message.includes("github profile") ||
             message.includes("his github") || message.includes("prabhat's github") ||
             message.includes("see github") || message.includes("explore github") ||
             message.includes("i want to see his github") || message.includes("i want to explore his github") ||
             message.includes("i want to see prabhat's github") || message.includes("i want to explore prabhat's github")) {
        openSocialLink("github");
    } else if (message.includes("stackoverflow") || message.includes("stackoverflow profile") || message.includes("stack overflow") ||
             message.includes("his stackoverflow") || message.includes("prabhat's stackoverflow") ||
             message.includes("see stackoverflow") || message.includes("explore stackoverflow") || message.includes("explore stack overflow") ||
             message.includes("i want to see his stackoverflow") || message.includes("i want to explore his stackoverflow") ||
             message.includes("i want to see prabhat's stackoverflow") || message.includes("i want to explore prabhat's stackoverflow")) {
        openSocialLink("stackoverflow");
    } else if (message.includes("naukri") || message.includes("naukri profile") ||
             message.includes("his naukri") || message.includes("prabhat's naukri") ||
             message.includes("see naukri") || message.includes("explore naukri") ||
             message.includes("i want to see his naukri") || message.includes("i want to explore his naukri") ||
             message.includes("i want to see prabhat's naukri") || message.includes("i want to explore prabhat's naukri")) {
        openSocialLink("naukri");
    } else if (message.includes("instagram") || message.includes("instagram profile") ||
             message.includes("his instagram") || message.includes("prabhat's instagram") ||
             message.includes("see instagram") || message.includes("explore instagram") ||
             message.includes("i want to see his instagram") || message.includes("i want to explore his instagram") ||
             message.includes("i want to see prabhat's instagram") || message.includes("i want to explore prabhat's instagram")) {
        openSocialLink("instagram");
    } else if (message.includes("twitter") || message.includes("twitter profile") ||
             message.includes("his twitter") || message.includes("prabhat's twitter") ||
             message.includes("see twitter") || message.includes("explore twitter") ||
             message.includes("i want to see his twitter") || message.includes("i want to explore his twitter") ||
             message.includes("i want to see prabhat's twitter") || message.includes("i want to explore prabhat's twitter")) {
        openSocialLink("twitter");
    } else if (message.includes("geeksforgeeks") || message.includes("geeksforgeeks profile") || message.includes("gfg profile") ||
             message.includes("his geeksforgeeks") || message.includes("prabhat's geeksforgeeks") ||
             message.includes("see geeksforgeeks") || message.includes("explore geeksforgeeks") ||
             message.includes("i want to see his geeksforgeeks") || message.includes("i want to explore his geeksforgeeks") ||
             message.includes("i want to see prabhat's geeksforgeeks") || message.includes("i want to explore prabhat's geeksforgeeks")) {
        openSocialLink("geeksforgeeks");
    } else if (message.includes("hackerrank") || message.includes("hackerrank profile") ||
             message.includes("his hackerrank") || message.includes("prabhat's hackerrank") ||
             message.includes("see hackerrank") || message.includes("explore hackerrank") ||
             message.includes("i want to see his hackerrank") || message.includes("i want to explore his hackerrank") ||
             message.includes("i want to see prabhat's hackerrank") || message.includes("i want to explore prabhat's hackerrank")) {
        openSocialLink("hackerrank");
    } else if (message.includes("resume") || message.includes("resume profile") ||
             message.includes("his resume") || message.includes("prabhat's resume") ||
             message.includes("see resume") || message.includes("explore resume") ||
             message.includes("i want to see his resume") || message.includes("i want to explore his resume") ||
             message.includes("i want to see prabhat's resume") || message.includes("i want to explore prabhat's resume")) {
        openSocialLink("resume");
    } else if (message.includes("certifications") || message.includes("certificates")) {
        window.open("YOUR_CERTIFICATIONS_LINK_HERE", '_blank');
        speak("Opening certifications link.");
    } else {
        let appName = message;

        // Handle pronunciation variations
        if (message.includes("tele gram")) {
            appName = "telegram";
        } else if (message.includes("calculator")) {
            appName = "calculator";
        } // Add more pronunciation variations as needed

        fetch('http://localhost:3000/open-app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ appName })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('App opened:', data);
            speak(`Opening ${appName}...`);
        })
        .catch(error => {
            console.error('Error:', error);
            // speak("I'm sorry, I didn't quite understand that. Could you please repeat your request?");
            // speak("I'm not sure what you meant. Can you please provide more details?");
            speak("I’m having trouble understanding that request. Could you try rephrasing it?");
            // speak("I didn’t catch that. Could you please clarify what you want me to do?");
            // speak("Sorry, I’m not able to process that request right now. Can you please specify your request more clearly?");
            // speak("I’m not sure how to handle that. Could you give me a bit more information?");
            // speak("I didn't get that. Can you please explain what you need in a different way?");
            // speak("I’m sorry, but I didn’t understand your command. Can you provide more details?");
            // speak("I’m not familiar with that request. Could you please describe it differently?");
            // speak("It seems like I didn’t catch that correctly. Can you try asking in another way?");
        });
    }
}
