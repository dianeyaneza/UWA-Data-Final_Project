### CONFIGURATION

1. Create a new conda environment just for this app. All of our project dependencies will be installed in this environment.
    
    conda create -n wmhdata_env python=3.6

2. Make sure to activate this new environment before proceeding
    
    conda activate wmhdata_env  

    * Note if you run into issues try the following command instead.

        source activate wmhdata_env

3. Next, install gunicorn to run the Flask app in a production environment.
    
    pip install gunicorn

4. Install flask and flask-sqlalchemy

    pip install flask
    pip install flask-sqlalchemy

5. Test the app 

    python app.py OR flask run

6. Navigate to 127.0.0.1:5000 to view the webpage

7. Generate the requirements.txt file which holds the Python packages required to run the app

    pip freeze > requirements.txt

8. Create 'Procfile' file for Heroku to run the app and add the following code instructing Heroku to run the app

    web: gunicorn app:app

9. Add, commit and push everything up to repo

### CREATING THE HEROKU APP

1. Create a new app on Heroku ('vjuliana-wmh').

2. Deploy using GitHub and connect to repo on GitHub. 

3. Select 'Manual deploy' section and click 'Deploy Branch'. 

4. Click 'View'

### PREPARING THE DATABASE