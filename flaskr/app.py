# Import the dependencies
import pandas as pd
import numpy as np
import datetime as dt

from flask import Flask, redirect, url_for, render_template, jsonify

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, text

#################################################
# Database Setup
#################################################
engine = create_engine('sqlite://', echo = False)


Plastic_df = pd.read_excel("assets/Plastic Data.xlsx")

Plastic_df.to_sql('oceanplastic', con=engine)
with engine.connect() as conn:
    print(conn.execute(text("SELECT * FROM oceanplastic")).fetchall())

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template("home.html")

@app.route("/test")
def test():
    return jsonify({"apple":4, "bana":5, "crab":6})

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

if __name__ == "__main__":
    app.run(debug=True)