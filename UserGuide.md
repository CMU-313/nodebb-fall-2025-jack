Hi! This is our user guide for Team Jack's NodeBB. Please follow the table of contents to each specific feature, or browse through all of them. 

[1. Email Notification](#name-of-feature-email-notification) <br>
[2. Unanswered Questions (unresolved posts)](#name-of-feature-unresolved-posts) <br>
[3. View All Posts](#name-of-feature-view-all-posts) <br>
[5. Filter Posts by Course Staff](#name-of-feature-filter-posts-by-course-staff) <br>
[10. Endorse Answers by Course Staff](#name-of-feature-endorse-answers-by-course-staff) <br>
[10. User Analytics Dashboard](#name-of-feature-User-Analytics-Dashboard) <br>



<hr>

## Name of Feature: Email Notification

*Link to the related user story and pull request(s)*
- User Story: https://github.com/CMU-313/nodebb-fall-2025-jack/issues/15
- PRs: https://github.com/CMU-313/nodebb-fall-2025-jack/pull/77, https://github.com/CMU-313/nodebb-fall-2025-jack/pull/43

### Manual Testing
*Detailed instructions on how to use and user test your new feature*
1. Download the `.env` file from the [shared google drive](https://drive.google.com/file/d/1XFQmOZFPj2SsV8CZmdOxoiA7-lfBJtPY/view?usp=drive_link), and add it to the root directory.
2. Run `./nodebb setup`
3. Run `npm install` 
4. Run `./nodebb dev` 
5. Log in as admin using username=`admin` and password=`password123!`. <img width="1334" height="559" alt="image" src="https://github.com/user-attachments/assets/cf09c4b0-9a54-4c98-a91a-59effb68b314" />
6. Go to Edit Profile 
<img width="1336" height="907" alt="image" src="https://github.com/user-attachments/assets/38668eba-c5bd-4c6e-ba89-95b982ec7323" />
7. Select Change Email 
<img width="1333" height="909" alt="image" src="https://github.com/user-attachments/assets/79f742b2-c31a-4271-b70a-758cb695657e" />
8. Enter your school email and the password `password123!`. Then click Submit. 
<img width="1337" height="704" alt="image" src="https://github.com/user-attachments/assets/0a6002f9-c780-4699-b1c8-75dd0674ed5a" />
9. In your terminal where you ran `./nodebb dev`, you should see console log statements. Click on the **confirm_link** 
<img width="633" height="310" alt="image" src="https://github.com/user-attachments/assets/9ed3f655-575b-45b0-9b57-b2a003c95ea7" />
<img width="1336" height="420" alt="image" src="https://github.com/user-attachments/assets/b8b85d58-ac39-48c2-aa88-5765662fdc7f" />
10. Go to [mailgun](https://login.mailgun.com/login/) and login with email: qge@andrew.cmu.edu, password: huy+5.SBZ@$/a2C <br>
11. Go to "Domains" under SENDING. Select the sandbox domain (second on the screenshot). <img width="1543" height="848" alt="image" src="https://github.com/user-attachments/assets/97cf430d-7992-424c-9a0a-1241e8a37673" /> <br>
12. Add your email address to Authorized Recipients. 
<img width="1534" height="710" alt="image" src="https://github.com/user-attachments/assets/7a3ea534-4f69-4180-a7a3-3045e0fed552" /> <br>
13. Select I Agree in the confirmation email 
<img width="1120" height="469" alt="image" src="https://github.com/user-attachments/assets/63e1f4f8-2ea7-4a31-a1dc-459e960b6cef" />
14. Go to Settings <img width="1340" height="905" alt="image" src="https://github.com/user-attachments/assets/8f1a0dab-27cf-49c8-bc3a-194cfae0e40f" />
15. Change notification settings of "When a new reply is posted in a topic you are watching" to "Notifications & Email" <img width="1333" height="782" alt="image" src="https://github.com/user-attachments/assets/d79903c0-f60b-4a7a-afa3-d4f844fd019c" /> 
16. Click Save Changes. <br>
17. As an admin, post a new topic. <img width="1913" height="831" alt="image" src="https://github.com/user-attachments/assets/e6fa0097-b342-4686-9454-00471f5dc434" /> <br>
18. Log out of the admin account <br>
19.  Login as a user (create a new user account if needed), and post a comment to that topic. <br>
20. You should receive an email in your admin account. <img width="1517" height="731" alt="image" src="https://github.com/user-attachments/assets/0a131220-3a1b-4d3d-9383-55bf47ffad6c" />
21. You can repeat the process to confirm that the user receives an email notification when another user responds to their post. However, note that the free tier email API will only send out 100 emails per day. We should be good as long as it's within that limit.


### Automated Tests
*Link/description of where your added automated tests can be found*
- Description of the automated tests can be found in this PR: https://github.com/CMU-313/nodebb-fall-2025-jack/pull/77

### Description of what is being tested and why you believe the tests are sufficient for covering the changes that you have made
What is being tested
- Backend test check that the mailgun plugin is triggered to send a notification email to user A when another user replies to user A's post
- Backend test check that the payload matches the expected payload for mailgun API, so that the mailgun API would not error out
- Manual testing process described above can confirm that the mailgun plugin is configured correctly, as the notification arrives in the user's mailbox after another user responds to the post

These tests are sufficient to cover the changes I've made in regards to the acceptance criteria of the user story, since it includes both testing of the payload format and the actual result of the receiving the email. This ensures that both in theory and in practice, the user should receive an email notification when a reply is made to their post.

<hr>

## Name of Feature: Unresolved Posts

Links to related user stories and pull requests: 
User story: #16 
Pull Requests: #24, #42 , #57 , #74 

### Automated Testing
our tests were added in the following PRs and files: 
- in #57 , test/topics/resolved.js
- in #74 , test/topics/resolved_count.js

These tests test the APIs, which call our functions. They are sufficient for the acceptance criteria outlined in tasks:
- #11 (When a student creates new post, it is defaulted to say unresolved), 
- #36 (only course staff can change unresolved state to resolved), 
- #52 (The function can be called and returns the correct amount of unresolved posts.)

We did not add automated tests for the frontend, because they are seen clearly when we start the server. The acceptance criteria is listed below:
- #12: The number of unresolved posts in each channel will be displayed on the home screen. This is tested in the front end. 

### Manual Testing
*note screenshots might differ slightly because of posts added locally)
1. Run ./nodebb setup
2. Run npm install
3. Run ./nodebb dev
4. Log in as admin using username=admin and password=password123!.

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/b3c41931-4d3a-49c5-b16c-8da88c1b5e6a" />

5. Navigate to the home page. 

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/83f41228-44d9-4cc2-bf40-074f86cb2334" />

6. Click into a category (eg. general discussion)

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/98bec8ba-8c8e-4d69-935a-7566cc8ffda1" />

7.  Create a new topic post

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/5a9dbc04-4564-465a-8d11-71358478882c" />

8. Observe that the checkbox is unchecked and the topic is marked as unresolved. 

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/2c6d74e1-36e7-405f-bb88-a6cd00f2e681" />

9. Navigate to the home page, and observe that the number of unresolved posts increased by one. 

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/454d9b89-0070-40b8-bb28-3e9ad392ea0d" />

10. Navigate back to the topic you just created. Check the box and observe that the post changes to resolved. 

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/7506e731-3ad1-4515-9a2f-0ca07d92d326" />

11. Navigate away from the topic and back to the topic. Observe that the topic remains resolved. 

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/4f6f3ca0-f82f-4bcd-bde8-94f0fbcb6b3f" />

12. Navigate back to the home page. Observe that the unresolved count decreased by one. 

<img width="1512" height="857" alt="Image" src="https://github.com/user-attachments/assets/e6bcb2b8-7306-4f52-8ef1-8dfabaf7a401" />

<hr>

## Name of Feature: View All Posts

*Link to the related user story and pull request(s)*
- User Story: https://github.com/CMU-313/nodebb-fall-2025-jack/issues/19
- PRs: https://github.com/CMU-313/nodebb-fall-2025-jack/pull/46

### Manual Testing
*Detailed instructions on how to use and user test your new feature*
1. Download the `.env` file from the [shared google drive](https://drive.google.com/file/d/1XFQmOZFPj2SsV8CZmdOxoiA7-lfBJtPY/view?usp=drive_link), and add it to the root directory.
2. Run `./nodebb setup`
3. Run `npm install` 
4. Run `./nodebb dev` 
5. Log in as admin using username=`admin` and password=`password123!`. <img width="1334" height="559" alt="image" src="https://github.com/user-attachments/assets/cf09c4b0-9a54-4c98-a91a-59effb68b314" />

6. Create a Few Sample Topics and Posts Per Topic in Each of the Categories for Testing

<img width="1280" height="845" alt="Image" src="https://github.com/user-attachments/assets/f5d852bc-9ef4-467f-8f31-6988a45a1e1a" />

7. Ensure the Topics and Posts Per Category correctly Sum to the Values Displayed in the View All Category on the Homepage. 

<img width="1283" height="711" alt="Image" src="https://github.com/user-attachments/assets/50011766-ab4b-4db0-bd87-05356eb7e5bc" />

6.  Select the View All Category, and ensure that all of the Sample Topics are Displayed in the List of All Topics (I created 7 in this example, and 7 Topics populate the View All Category)

<img width="1275" height="999" alt="Image" src="https://github.com/user-attachments/assets/0eb5ac72-8680-42ea-88ae-670e3fb702a7" />

7. As an Example to Test Deletion and How it Affects the View All Category, I deleted all Topics in Announcements. 

<img width="1223" height="823" alt="Image" src="https://github.com/user-attachments/assets/46d1ee66-fa66-4ee5-8946-2b085458d77d" />

8. Verify the Topics you Deleted are Now Grayed Out in the View All Category Tab 

<img width="1228" height="956" alt="Image" src="https://github.com/user-attachments/assets/568d3748-8824-47e0-b77a-c034c7bfa388" />

### Automated Tests
*Link/description of where your added automated tests can be found*
- Description of the automated tests can be found in this commit in (https://github.com/CMU-313/nodebb-fall-2025-jack/pull/69)
### Description of what is being tested and why you believe the tests are sufficient for covering the changes that you have made
What is being tested
- Synthetic "View All" category aggregation:Confirms that the system correctly exposes a synthetic “View All” category and that the aggregate topic and post counts reflect all visible categories. This ensures that the API dynamically builds and updates the overall forum view.
- Rendering via the recent controller: Verifies that the /api/category/all endpoint correctly renders the “View All” category using the recent template, confirming that the routing and rendering logic integrate properly with the new aggregate category.
- Privilege handling in aggregates: Tests that categories without the find privilege are excluded from the “View All” aggregates, preventing restricted or private content from being counted or displayed in aggregate statistics.
- Teaser behavior for latest visible activity: Checks that the “View All” teaser corresponds to the most recent visible topic across categories. By mocking timestamps with MockDate, the test ensures that teaser logic prioritizes the newest valid topic, even when categories are created at different times.

### Why these tests are sufficient
These tests collectively ensure that the “View All” category feature behaves as intended across the full range of functional, security, and temporal scenarios. They verify correct data aggregation, ensuring that topic and post counts are accurate and update dynamically as new content is created.
They confirm robust privilege enforcement, validating that restricted categories remain invisible in the aggregate view to users lacking access. They test UI consistency and rendering, ensuring that the /api/category/all endpoint serves the expected data model and template for front-end use.
Finally, the teaser test introduces time-sensitive validation, confirming that the displayed teaser always represents the latest available activity. Together, these test cases provide comprehensive coverage for correctness, security, and reliability of the “View All” category aggregation system.


<hr>

## Name of Feature: Filter Posts by Course Staff

*Link to the related user story and pull request(s)*
- User Story: https://github.com/CMU-313/nodebb-fall-2025-jack/issues/31
- PRs: https://github.com/CMU-313/nodebb-fall-2025-jack/pull/73
### Manual Testing
*Detailed instructions on how to use and user test your new feature*
1. Download the `.env` file from the [shared google drive](https://drive.google.com/file/d/1XFQmOZFPj2SsV8CZmdOxoiA7-lfBJtPY/view?usp=drive_link), and add it to the root directory.
2. Run `./nodebb setup`
3. Run `npm install` 
4. Run `./nodebb dev` 
5. Log in as admin using username=`admin` and password=`password123!`. <img width="1334" height="559" alt="image" src="https://github.com/user-attachments/assets/cf09c4b0-9a54-4c98-a91a-59effb68b314" />
6. Go to Groups in the Left Side Panel 

<img width="1280" height="496" alt="Image" src="https://github.com/user-attachments/assets/1d9d24a6-cc2e-4526-8c3c-54d8c52f08bc" />

7. Select "Create New Group" button, name it "course-staff", and click finish

<img width="1148" height="538" alt="Image" src="https://github.com/user-attachments/assets/555cbd4f-91a3-4a21-a3cb-e166c14447eb" />

8. If not a member of the course-staff group, select "Join Group" 

<img width="1280" height="674" alt="Image" src="https://github.com/user-attachments/assets/60766169-3212-4a02-bbce-0fe2a6a3a947" />

9. Navigate back to the homepage and click on any category that is not the view all category and make a post 

<img width="1279" height="841" alt="Image" src="https://github.com/user-attachments/assets/248be2f6-ed4e-44d8-a4d3-e8ef320fc961" />

10. Click Filter by Author, and Select "Course Staff Only" in the Dropdown 

<img width="1153" height="606" alt="Image" src="https://github.com/user-attachments/assets/6997a0be-096a-437d-adda-be25d07004e6" />

11. Confirm that the Test Post created still appear after Filtering by Course Staff

<img width="1138" height="327" alt="Image" src="https://github.com/user-attachments/assets/58afe4bb-dda4-4d79-bba8-8fabe8b71772" />

12. Navigate Back to the Course Staff group, and Leave the Group. 

<img width="1160" height="482" alt="Image" src="https://github.com/user-attachments/assets/3c71df62-c809-4452-a597-f660cad85339" />

13. Repeat step 11, but this time the Test Post, or any other Posts created by the Admin Account should not Populate after filtering by Course Staff. 

<img width="1140" height="534" alt="Image" src="https://github.com/user-attachments/assets/9bdc93f1-a069-42d8-a68a-204d56ca140a" />

### Automated Tests
*Link/description of where your added automated tests can be found*
- Description of the automated tests can be found in this commit in PR #73 in test(category): add integration tests for course staff filtering 

### Description of what is being tested and why you believe the tests are sufficient for covering the changes that you have made
What is being tested
- Backend filtering behavior: Verifies that the new courseStaff query parameter correctly filters category topics to only include posts made by users in the "course-staff" group.
- Edge cases: Ensures correct behavior when the "course-staff" group does not exist or contains no members, confirming that no topics are returned in these cases.
- Pagination handling: Tests that filtering by course staff works seamlessly with paginated topic lists, ensuring consistent filtering logic even when multiple pages of results exist.

These tests are sufficient because verify that the courseStaff filter functions correctly under normal, error-handling, and pagination scenarios. In normal operation, both staff and non-staff topics exist within a category, and the filter correctly returns only the topics created by members of the "course-staff" group. The error-handling tests ensure that when the "course-staff" group is missing or empty, the API responds gracefully by returning an empty result rather than throwing an error or exposing unrelated topics. Finally, the pagination tests confirm that the filtering logic remains consistent across multiple pages of topics, ensuring complete and accurate results even when the dataset is large. Together, these tests validate the correctness, robustness, and reliability of the courseStaff filtering feature.

<hr>

## Name of Feature: Endorse Answers by Course Staff
### Feature 1: Back/Frontend basic functionalities 
### Feature 2: Add Endorsed Filter

*Link to the related user story and pull request(s)*
user story #32 

**Feature 1: Back/Frontend basic functionalities ** 

- issues: #63,  #72 
- prs: #70, #71 

**Feature 2: Add Endorsed Filter**

- issue #62 

- pr #80

### Manual Testing
*Detailed instructions on how to use and user test your new feature*

### **Feature 1: Regular Utilities of Endorsed Button**

1. Run `./nodebb setup`
3. Run `npm install` 
4. Run `./nodebb dev` 
5. Run `./nodebb start`
6.  Create non-admin account, say username = `student`,  password = `whateveryouwouldlike'`
7.  Verify the posts do not have any button regarding to an endorsed button as a non-admin.  
8. Click on one non-endorsed post (no button visible) to verify for sure. Remember this post name.
**Non-Admin's Perspective:** 

<img width="1050" height="509" alt="image" src="https://github.com/user-attachments/assets/8969ff40-7622-45f7-99e0-c2f74763dc65" />

9.  Log in as admin using username=`admin` and password=`password123!`. <img width="1334" height="559" alt="image" src="https://github.com/user-attachments/assets/cf09c4b0-9a54-4c98-a91a-59effb68b314" />
10. Now click on the same post you viewed earlier as a non-admin. 
11. Verify that you see an `endorse this post?` button. 
**Admin's Perspective:** 

<img width="1079" height="644" alt="image" src="https://github.com/user-attachments/assets/f3b40f37-1a54-4238-88a5-781f31f71fab" />

12. Click on the `endorse this post?` button to verify it now says `endorsed`. Verify you can toggle back and forth from `endorse this post?` and `endorsed` to verify the status is updating and being written to correctly (when only admin clicks).  Also verify no errors/lags/404 errors occur in the console.log.

<img width="1103" height="956" alt="image" src="https://github.com/user-attachments/assets/32aa4203-ca57-4138-a6cf-35305376d32e" /> 

13. Log back in as your non-admin account. Go to the same post that originally had no sign of an endorsed button --> you made admin changes --> and now verify you can see `endorsed by admin` blue button!  
**Non-Admin's perspective:** 

<img width="1104" height="730" alt="image" src="https://github.com/user-attachments/assets/ca3030be-55d5-41be-bccc-d036a88cdece" />




### **Feature 2: Endorsed Filter Instructions**



1. Run `./nodebb setup`
3. Run `npm install` 
4. Run `./nodebb dev` 
6. Log in to NodeBB as an admin using username=`admin` and password = `password123!`
7. Go to the"Announcements" category. If there are no topics, create a topic. Otherwise, randomly click on a topic.
8. Click on "endorse this post?" to mark it as "endorsed"  <img width="1543" height="718" alt="image" src="https://github.com/user-attachments/assets/c5c0c086-cdb1-46b7-861f-c907fccac8ae" />
9. Return to the categories page, i.e. "Announcements" 
10. Create another topic, post a reply, and endorse that reply 
<img width="1544" height="668" alt="image" src="https://github.com/user-attachments/assets/f1f3907a-28db-4d72-a100-9ec23cef7baf" />
11.  Return to the "Announcements" page and create a topic without endorsing it. 
<img width="1542" height="760" alt="image" src="https://github.com/user-attachments/assets/2b7b56d7-9b2a-475a-8a5c-2064ca165d82" />
12. Return to the "Announcements" page and select "Endorsed Posts" 
<img width="1545" height="833" alt="image" src="https://github.com/user-attachments/assets/db94ba70-7158-4697-84e5-bf68a998cec9" />
13. You can see that it only displays the topics that contain a post or reply that has been endorsed 
<img width="1542" height="759" alt="image" src="https://github.com/user-attachments/assets/87c94ffc-f667-412b-bc2f-223d8e45a421" />


### Automated Tests
*Link/description of where your added automated tests can be found*

 Feature 1 testing:  pr #71 , `test/posts/endorsed.tests.js`
 Feature 2 testing: pr #80 ,  `test/topics-endorsed.js`

### Description of what is being tested and why you believe the tests are sufficient for covering the changes that you have made


### **Feature 1:** 

**Test Cases**
- Backend Testcases(9) : main tests --> testing get/put endpoints, testing if endorsed status defaults to false, test if only admin can endorse/un-endorse a post, test that if non-admin tries to endorse-> fails,  test if endorsed status properly updated and written to when needed, test that non-registered can still see endorsed posts. 
- Frontend Testcases(2): test frontend display button is displayed correctly, test clicking application on and off  correctly correlates/updates/writes to backend status 

I believe these are sufficient because they test all the acceptance criteria I created for issue #72: the general cases and edge cases (you can toggle between endorse/un-endorse multiple times) which include reading and writing the new endorsed status, it involves who has the correct permissions , and it also involves the user satisfaction (blue button).  When running nodebb, there is also no console.log error and no delays/errors occur. They also pass these test cases, and do not affect the overall code coverage when testing. Therefore, these tests cover the changes that have been made sufficiently. 


### **Feature 2:** 

**Test Cases**

- Backend tests in `test/topics-endorsed.js`
    - ensure that Topics.filterEndorsedTids returns only endorsed topic tids
    - Topics.filterEndorsedTids handles empty input gracefully
    - Topics.filterEndorsedTids returns multiple endorsed tids when present
    - categories.getCategoryById with filter=endorsed returns only endorsed topics
    - categories.getCategoryById with sort=endorsed behaves like filter=endorsed

These test cases are sufficient since they test all the acceptance criteria for issue #62,  with general cases (read/writes correctly read the endorsed status and don't cause any error) and also edge cases (handling empty inputs) all pass these test cases, and still do not affect the overall code coverage when testing. When running nodebb, there is also no console.log error and no delays/errors occur. Therefore, these tests cover the changes that have been made sufficiently. 

## Name of Feature: User Analytics Dashboard

*Link to the related user story and pull request(s)*
- User Story:https://github.com/CMU-313/nodebb-fall-2025-jack/issues/18
- PRs:https://github.com/CMU-313/nodebb-fall-2025-jack/pull/56

### Manual Testing
*Detailed instructions on how to use and user test your new feature*
1. Download the `.env` file from the [shared google drive](https://drive.google.com/file/d/1XFQmOZFPj2SsV8CZmdOxoiA7-lfBJtPY/view?usp=drive_link), and add it to the root directory.
2. Run `./nodebb setup`
3. Run `npm install` 
4. Run `./nodebb dev` 
5. Log in as admin using username=`admin` and password=`password123!`. <img width="1334" height="559" alt="image" src="https://github.com/user-attachments/assets/cf09c4b0-9a54-4c98-a91a-59effb68b314" />
6. Go to the Admin Tab from the Homepage 

<img width="1275" height="720" alt="Image" src="https://github.com/user-attachments/assets/06a1e666-f646-41b9-8401-62024d36998c" />

7. Select the users subtab under the Dashboards primary tab. Within this tab, there should be a UserActivity table with 4 fields per user that joined

<img width="1278" height="1199" alt="Image" src="https://github.com/user-attachments/assets/651444a4-8b42-4300-927a-52d805d33a2d" />

8. Select the User Activity link to expand the table.


<img width="995" height="149" alt="Image" src="https://github.com/user-attachments/assets/22a52ff0-eb65-4be8-b9de-7bed3de09ba3" />

9. Verify that there are 5 fields per user in this view. 

<img width="1033" height="197" alt="Image" src="https://github.com/user-attachments/assets/532961f3-dd0a-4980-80f9-24c5286a8e9a" />

### Automated Tests
*Link/description of where your added automated tests can be found*
- Description of the automated tests can be found in Commit in this PR: https://github.com/CMU-313/nodebb-fall-2025-jack/pull/56
### Description of what is being tested and why you believe the tests are sufficient for covering the changes that you have made
What is being tested
- User activity tracking accuracy: These tests validate that the /api/admin/dashboard/user-activity endpoint accurately reflects changes in user post counts when a new topic or post is created. The test first records a user’s initial postCount, creates a new post, and then re-queries the endpoint to confirm that the count increments by exactly one. This ensures the correctness of the server’s aggregation logic for user activity statistics.
- Handling of inactive users:A separate test confirms that newly created users with no recorded actions (posts, shares, or uploads) are handled gracefully by the system. It verifies that all activity-related fields (postCount, shareCount, and uploadCount) are numeric and default to zero when no data exists. This guarantees consistent API responses and prevents null or undefined values in the dashboard data.
- Dashboard accessibility and rendering:Multiple tests ensure that the User Activity Dashboard loads correctly for admin users through both standard and parameterized requests. These verify that the rendered HTML includes expected table headers such as “Number of Posts,” “Number of Shares,” and “Number of Uploads.” Additionally, queries with time range parameters (e.g., ?units=days&until=<timestamp>&count=<n>) confirm that date filtering logic functions properly.

- Authorization and security checks:One test explicitly validates access control by ensuring that non-admin users receive a 403 Forbidden response when attempting to load the /admin/dashboard/user-activity page. This ensures that sensitive administrative data remains inaccessible to regular users.


These tests collectively ensure the functional accuracy, robustness, and access control of the entire Admin Dashboard system. The increment test confirms that user activity metrics update precisely when new posts are created, validating the backend logic that powers the dashboard’s reporting accuracy. The zero-activity test demonstrates that the API handles edge cases gracefully by returning well-typed, predictable data even for users with no recorded activity. Access control is verified through the 403 test, which ensures that only administrators can access analytics data, effectively preventing unauthorized access. Additionally, by testing both standard and parameterized dashboard endpoints, the suite guarantees the reliability of the analytics pages under various query conditions, helping prevent regressions in future updates. The inclusion of multiple dashboard routes—such as logins, users, topics, searches, and user-activity—provides comprehensive coverage, confirming that all admin-facing analytics interfaces load correctly and display essential data components. Together, these tests validate the integrity, usability, and security of the Admin Dashboard’s user activity and analytics features, ensuring administrators receive accurate, complete, and protected insights into user behavior.