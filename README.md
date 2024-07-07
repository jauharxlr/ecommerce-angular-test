<h1>Ecommerce Test Project</h1>

Considering this as a test project, only a limited number of features are included:
<br/>
<ul>
<li>Integrated Bootstrap</li>
<li>Integrated Angular Material</li>
<li>Created a reusable rest service class to channel all API calls</li>
<li>Created a reusable adaptive state-management service with singleton pattern to reproduce redux like behaviour</li>
<li>Configured authorisation token for secured API endpoints</li>
<li>Implemented login, signup, logout features to test user service</li>
<li>Implemented list, create, update, delete, filter feature for product service</li>
<li>Implemented view encapsulation using angular specific directives</li>
<li>Showcased usage of structural directives</li>
<li>Added validations for all forms</li>
<li>Implemented auth guard to block unauthorized access</li>
<li>Configured routing for all pages.</li>
<li>User role based features. Only admin is allowed to create/edit/delete product</li>
</ul>


**Local Setup**
<ul>
<li>cd to project root directory and run <code>npm i</code> </li>
<li>run <code>ng s -o</code></li>
</ul>

**Default admin detail**<br/>
<code>{
    "emailId":"admin@ecommerce.com",
    "password":"admin123"
}</code>