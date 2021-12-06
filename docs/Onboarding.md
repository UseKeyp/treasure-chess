# The Onboarding Doc :scroll:
Welcome to Nifty Chess. Time to get onboarded. You've now been added to GitHub and discord. Please read this stuff.

This will be a living document we will update as needed. Please comment with suggestions/changes.

## Some things to keep in mind
- Ask for help. Dont bang your head against
- If you get blocked, ask for help.
- Pair programming is good. Let's work together for an hour.
- The [redwood docs](https://redwoodjs.com/docs/introduction) are your friend.

## Sprints and bi-Weekly todos for devs
We are running 2-week building sprints. That means every other Monday a new sprint starts. The goal is all the tasks in the current sprint are done by then.

Over the weekend or on monday morning before sprint planning start send Joseph a message with with how many hours you plan to work each week for the next 2 weeks. This is also a great time

### Pull Requests
When you complete a task (:tada: yayy) make a pull request against the `dev` branch. Tag someone else like pi0neerpat or Joseph to review it. Remember to watch github for notifications of comments on your PR. Once its reviewed you are responsible for merging, closing, and deleting the branch. 

**Number of files**: Your goal is <10 files changed for each Pull Request, and only a small group (1-2) for new components. 

**File size**: Please try to keep all files under 300 lines.

Pull Request Check List:
- [ ] Did I link to the issue # that this PR closes?
- [ ] Did you include a screenshot?
- [ ] Did you export any new components from `index.js`?
- [ ] Did you run `yarn scan-i18n` and commit changes?
- [ ] Did you run `yarn lint` and fix all errors and warnings? 
- [ ] Did you check console-logs and fix all errors and warnings? 
- [ ] If you changed a existing component, did you also update the PropTypes and Example?

## Getting around
All the code you need is in the main repo. 
Tasks are issues on GitHub.
Designs are in figma.
Everything about the current sprint is in the Projects tab on github. You can sort by the tasks that are assigned to you and aim to have those completed by the end of the sprint.
Check the /docs folder for specifics about the smart contracts, processes, and other things you might need.

### Naming
 Issues: `[app/feather/tooling/meta] Description`

eg. `[app] Update login page routing` or `[feather] add CallToAction`

 PR (same as issue): `[app/feather/tooling/meta] Description`

eg. `[app] Update login page routing` or `[feather] add CallToAction`

 Branch: `app/feather/tooling/meta-add/update/fix-component/description` 

eg.  `app-update-login-page-routing` or `feather-add-calltoaction` 

## Next Steps
### Follow the readme instructions and get the app going
1. Get your .env setup by using the template
2. Get the redwood app running
3. migrate your databases and setup prisma / anything else needed to complete your tasks. Directions in the readme.
4. create an account on chess-4.com.
5. run the app with authentication and log in.

If you havent run this kind of app before, it can take a bit of work to get it going, but it shouldnt take too long. Ask for help if you get stuck, we dont have time to spend days setting up the app.

### admin stuff
1. Schedule a call tomorrow with Joseph to show the app running and debug any issues
2. Get your first issue and get any questions about it answered.
3. Set up a `prettier` linter in your code editor. We have automatic deployments

## Getting paid
Send Joseph an invoice. template invoice pinned in the #everything-else channel
