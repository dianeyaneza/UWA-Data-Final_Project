# Dependencies
from flask import (
    Flask, 
    render_template, 
    request, 
    redirect, 
    jsonify)
from models import create_classes
import sqlalchemy
import pandas as pd
from sqlalchemy import create_engine, func
import json

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql' + os.environ.get('DATABASE_URL', '')[8:]  or "sqlite:///db.sqlite"
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

wmhdata = create_classes(db)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

    
# END POINT: JSON WORLD MH DATA
@app.route("/api_wmhdata")
def events():
    # See wmhdata_flask.ipynb for the same code at this end point, showing the variable outputs throughout the steps. 

    ######### CONNECT TO DATABASE AND READ DATA AS DATAFRAME VIA PANDAS #########
    # Step 1. ##### Connect to postgres database and save to variable 'engine' #####

    ### Option 1: For postgres users
    rds_connection_string = "postgres:postgres@localhost:5432/events_db"
    
    ### Option 2: For postgres users to enter in personal login details (if option1 does not work)
    rds_connection_string = "postgres:309Malanday!@localhost:5432/events_db"

    engine = create_engine(f'postgresql://{rds_connection_string}')

    # Step 2. #### Save the data to a variable via pandas, using the 'engine' variable. #####
    wmhdata = pd.read_sql_table('whatdoyoumean_table', engine) 

    # Step 3. #### Convert pandas dataframe to json format. json.loads will convert it to a clean and readable format. #####
    wmhdata_result = json.loads(json.dumps(json.loads(wmhdata.to_json(orient = "records")), indent=4)) 
    return jsonify(wmhdata_result)    

##########################################################

if __name__ == "__main__":
    app.run(debug=True)
