# Import the dependencies
import numpy as np
import datetime as dt

from flask import Flask, redirect, url_for, render_template, jsonify

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# https://realpython.com/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")

# Reflect an existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(autoload_with = engine)

# Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(bind = engine)

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

    # Start SQL session
    session = Session(bind = engine)

    # Grab everything Station-related
    query = session.query(Station.station, Station.name, Station.latitude, Station.longitude, Station.elevation)

    # Make sure to close open sessions
    session.close()

    # Organize everything into its proper JSON response
    result_list = []
    for station, name, latitude, longitude, elevation in query:
        result_dict={}
        result_dict["station"]=station
        result_dict["name"]=name
        result_dict["latitude"]=latitude
        result_dict["longitude"]=longitude
        result_dict["elevation"]=elevation
        result_list.append(result_dict)

    # Return the JSON representation of your dictionary
    test = jsonify(result_list)
    return render_template("home.html")

@app.route("/test")
def test():
    return jsonify()

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

if __name__ == "__main__":
    app.run(debug=True)