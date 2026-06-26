# Instructions:

Act like a senior frontend software engineer, who is wise, kind, and efficient. Do not overcomplicate the code, and make it easily maintainable and useable by others. I am a mid-level software engineer who is getting back into coding and working on elements. 

I have an existing project that I want to modify. I have attached the html file. Your job is to read in the following project file, and make some modifications so that it is more user-friendly, and able to be hosted easily as a static webpage. The goal output is a flat-style webpage. You do not need to pre-optimize it to have a database yet, this is simply a frontend website. Please use HTML/CSS and optimize for maintainabilty and simplicity. If this is too difficult, you can also build a small typescript website with NextJS or another web framework.

The steps of this project use are as follows:
- allow the user to input a Google sheet URL, or upload an .XLSX file
- read the contents of the Google sheet or the XLSX file
Note that the input data will have consistent formatting, and "filters"- which are as follows: [Theme, Sub Theme, Implement, Position, Exercise]

You do not have to run extensive checks on the format or the validity of the spreadsheet. There will be approximately 2000 exercises, and you can assume it's in "Sheet1" or the the first sheet in the spreadsheet index

- allow the user to filter by theme, sub-theme, implement, position to find the exercises which fit those categories 
- allow the user to add / remove them to a running list. The maximum number of exercises to add is 15
- whenever the user feels like it, they can also copy the exercises that they have selected so far. Make it easy enough for them to paste this exercise list into another spreadsheet, so it should be formatted well. 


# Code checks:
- exercises can be uploaded from a spreadsheet or a URL
- exercises are displayed in a table, with no more than 20 exercises displayed at one time. The user can tab between the pages of the table
- filters are easily usable
- there is a clear "add" button on the side of each exercise. You don't need to get to the end of an "exercise path" before modification
- there are also clear "X" buttons to remove exercises on the session exercise list

# Next steps:
- follow the design flavor and setup of https://v0-dynamic-table-from-spreadsheet.vercel.app/. The color scheme is setup as

```
@supports (color:lab(0% 0 0)) {
    :root {
        --background: lab(5.12993% -.528157 -11.4295);
        --foreground: lab(97.68% -.0000298023 .0000119209);
        --card: lab(9.31925% -.997268 -13.9476);
        --card-foreground: lab(97.68% -.0000298023 .0000119209);
        --popover: lab(9.31925% -.997268 -13.9476);
        --popover-foreground: lab(97.68% -.0000298023 .0000119209);
        --primary: lab(57.2957% 68.2089 53.3027);
        --primary-foreground: lab(97.68% -.0000298023 .0000119209);
        --secondary: lab(12.8156% -1.30244 -14.0053);
        --secondary-foreground: lab(94.2% 0 0);
        --muted: lab(16.341% -1.5578 -12.3498);
        --muted-foreground: lab(65.2% 0 0);
        --accent: lab(57.2957% 68.2089 53.3027);
        --accent-foreground: lab(97.68% -.0000298023 .0000119209);
        --destructive: lab(45.5382% 69.8881 46.2994);
        --destructive-foreground: lab(97.68% -.0000298023 .0000119209);
        --border: lab(20.9611% -1.78036 -14.1141);
        --input: lab(11.6506% -1.20977 -13.9869);
        --ring: lab(57.2957% 68.2089 53.3027);
        --chart-1: lab(57.2957% 68.2089 53.3027);
        --chart-2: lab(55.4813% -53.5836 -.346684);
        --chart-3: lab(48.3549% -26.3166 -28.0478);
        --chart-4: lab(65.0726% 21.5014 116.322);
        --chart-5: lab(50.5537% 58.3311 -36.0292);
        --sidebar: lab(3.58124% -.238918 -10.0256);
        --sidebar-foreground: lab(97.68% -.0000298023 .0000119209);
        --sidebar-primary: lab(57.2957% 68.2089 53.3027);
        --sidebar-primary-foreground: lab(97.68% -.0000298023 .0000119209);
        --sidebar-accent: lab(12.8156% -1.30244 -14.0053);
        --sidebar-accent-foreground: lab(94.2% 0 0);
        --sidebar-border: lab(20.9611% -1.78036 -14.1141);
        --sidebar-ring: lab(57.2957% 68.2089 53.3027);
    }
}
```