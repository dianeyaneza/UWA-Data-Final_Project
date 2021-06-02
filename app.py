# Dependencies
from flask import Flask, render_template, redirect, jsonify
import sqlalchemy
import pandas as pd
from sqlalchemy import create_engine, func
import json

# Create an instance of Flask
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

    
# END POINT: JSON WORLD MH DATA
@app.route("/wmwbata")
def events():
    # See events_flask.ipynb for the same code at this end point, showing the variable outputs throughout the steps. 

    ######### CONNECT TO DATABASE AND READ DATA AS DATAFRAME VIA PANDAS #########
    # Step 1. ##### Connect to postgres database and save to variable 'engine' #####

        ### Option 1: For postgres users
    rds_connection_string = "postgres:postgres@localhost:5432/events_db"
    
        ### Option 2: For postgres users to enter in personal login details (if option1 does not work)
    rds_connection_string = "postgres:309Malanday!@localhost:5432/events_db"

    engine = create_engine(f'postgresql://{rds_connection_string}')



##########################################################

if __name__ == "__main__":
    app.run(debug=True)
