Overview: this website is used to build workouts for wheelchair athletes. It has multiple filters by muscle targeted, position of the exercise, and equipment avavailable. Then you can "add" the exercises to the list of exercises. Finally it'll allow you to copy/paste them back into another new spreadsheet.


Steps:
- website URL to upload the google spreadsheet, and list all the exercises
- read the spreadsheet and its parameters
- add / remove button to add the exercises to a current list
- have an easy copy/paste button so that you can copy/paste the exercises

----------------------------------------------------------
Modifications from the locally written website:
- change the upload button for excel files, to reading from Google sheets
- update the colors scheme to match the blue and the orange
- run it in Vercel

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
````
