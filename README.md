# Berkeley Data Bootcamp: Project 3
> How do we communicate data through different files and filetypes to create a front-end display?

## Folder Contents
- A main `flaskr` folder containing:
  - A `static` folder with the CSS and JS code used to render our webpage and any data imported for processing.
  - A `templates` folder our HTML code.
  - A main `app.py` Python Flask script that acts as the server that hosts our website and sends it the JSON data it needs.
- A `.gitignore` file for Jupyter Notebook checkpoints and other commonly gitignored Python entities.

### Installation/Prerequisites
- Make sure you can run Python. The development environment we used was set-up with:
```
conda create -n dev python=3.10 anaconda -y
```
#### Imported Modules
- Installing via the conda command given should give you access to all of the script's modules locally. However, if you don't have them, be sure to grab yourself the following libraries:
  - [Pandas](https://pandas.pydata.org/docs/getting_started/install.html)
  - [NumPy](https://numpy.org/install/)
  - [Flask](https://flask.palletsprojects.com/en/2.3.x/installation/)
  - [SQLAlchemy](https://docs.sqlalchemy.org/en/20/intro.html#installation)
  - The other imports you may notice are native Python modules and should have come with your Python downloads, no links are necessary. Any errors on that end are dependent on the machine's Python installation and pathing process.
 
- Any dependencies we used are all pulled online from CDNs and official releases, but please refer to the links below if you want to examine the specific version used in this project or download the modules with NPM for work with Node.js:
  - [Leaflet](https://leafletjs.com/examples/quick-start/) to produce the maps for this project.
    - The [Leaflet-Choropleth](https://github.com/timwis/leaflet-choropleth) has nonexistent documentation, but, because it extends from the Leaflet classes, commands and tricks that work with the Parent also work here. 
  - [D3 v7](https://d3js.org/getting-started#d3-in-vanilla-html) to read JSON files and handle DOM tree element manipulation.
  - [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) to style our website.
  - [Plotly](https://plotly.com/javascript/getting-started/) to create graphs.
 
Sources:
  - All data came from [Cecilia Martin's paper](https://aslopubs.onlinelibrary.wiley.com/doi/pdf/10.1002/lol2.10257) and [her downloadable dataset](https://data.mendeley.com/datasets/6k38hr5zhw/1).

## FINAL NOTES
> Project completed on August 10, 2023
