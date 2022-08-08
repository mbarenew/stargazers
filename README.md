### Stargazers

## Intro
The mobile app is represented as follows:
- Splashscreen: to give some animation.
- Home screen: made up of two text inputs (to set the owner and repo) and a button where you navigate the stargazers screen.
- Stargazers screen: in this screen we see the stargazers. If the call fails (404 or other types of errors) then an error will be shown.

## How the project was structured (libraries, controls and more)

A folder called src was created in the project, divided into:
- assets: we find images and animations used in the app
- components: the components reused in the project have been created.
In particular, the Basescreen was created which serves to differentiate the safe area with the rest of the app screen (therefore Header with status bar) and then divide the screen into two main parts, header and content.
- contexts: a folder where I created a context to pass the info (owner and repo) from the home screen to the stargazers screen. I could use react native navigation, but I preferred to use the contexts approach for the advantages we have (for example we don't have problems with drop drilling)
- models: are the objects we use both in input and output.
- navigation: where the navigation stack of the app screens has been defined.
- screen: the app screens.
- services: part used for the management of remote calls (in this case)
- utils: functions that can be reused throughout the app

Notes: I am becoming more and more passionate about the use of functional programming, due to the advantages it brings. For this reason I use the fp-ts library. It has also been exploited for the control of the filling of the text inputs, through its decoding.
