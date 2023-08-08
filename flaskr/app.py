# Import the dependencies
import numpy as np
import datetime as dt

from flask import Flask, redirect, url_for, render_template

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# https://realpython.com/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/

#################################################
# Database Setup
#################################################
#engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# Reflect an existing database into a new model
#Base = automap_base()

# Reflect the tables
#Base.prepare(autoload_with = engine)

# Save references to each table
#Measurement = Base.classes.measurement
#Station = Base.classes.station

# Create our session (link) from Python to the DB
#session = Session(bind = engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    # List all the available routes.
    return render_template("home.html")

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

if __name__ == "__main__":
    app.run(debug=True)