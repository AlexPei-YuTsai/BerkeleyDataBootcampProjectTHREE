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

Plastic_df = pd.read_excel("static/assets/Plastic Data.xlsx")

Plastic_df.to_sql('oceanplastic', con=engine, if_exists="replace", index=False)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    # Default Route: Basic EDA and Map display
    return render_template("home.html")

# Group By:
    # Continent
    # Habitat Type
    # Water Depth


# This section retrieves data 
@app.route("/api/init")
def test():
    # Gotta recreate your engine every time
    Plastic_df.to_sql('oceanplastic', con=engine, if_exists="replace", index=False)
    with engine.connect() as conn:
        results = conn.execute("SELECT * FROM oceanplastic").fetchall()

    # Set up a list of GeoJSON points to push
    result_list = []
    for row in results:
        # Base GeoJSON Template
        feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    # coordinates go here
                },
                "properties": {
                    # everything else goes here
                }
            }
        
        denominator = row['Corrected_Fibers (n kg-1)']+row['Corrected_Non-Fibrous (n kg-1)']

        if (denominator!=0):
        # Fill in the rest of the desired details here
            feature["geometry"]["coordinates"]=[row['Longitude €'], row['Latitude (N)']]
            feature["properties"]["Area"]=row['Continent']
            feature["properties"]["Biome"]=row['Habitat_Type']
            feature["properties"]["Depth"]=row['Water_Depth (m)']
            feature["properties"]["Population"]=row['Mean Population in 110 km radius (no. people km-2)']
            feature["properties"]["Fiber_Abundance"]=row['Corrected_Fibers (n kg-1)']
            feature["properties"]["NonFiber_Abundance"]=row['Corrected_Non-Fibrous (n kg-1)']
            feature["properties"]["Total_Abundance"]=denominator
            feature["properties"]["Prop_Fiber"]=row['Corrected_Fibers (n kg-1)']/denominator
            feature["properties"]["Prop_NonFiber"]=row['Corrected_Non-Fibrous (n kg-1)']/denominator

            # Append completed GeoJSON to list
            result_list.append(feature)
        
    return jsonify(result_list)
    
@app.route("/api/agg")
def agg():
    # Gotta recreate your engine every time
    Plastic_df.to_sql('oceanplastic', con=engine, if_exists="replace", index=False)
    with engine.connect() as conn:
        results = conn.execute("SELECT * FROM oceanplastic GROUP BY Continent ORDER BY COUNT(ID) DESC").fetchall()
    
    return results

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

if __name__ == "__main__":
    app.run(debug=True)