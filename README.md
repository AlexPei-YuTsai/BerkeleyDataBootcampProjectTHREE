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

## Preview:

Below is a preview of the content you'd see, assuming everything loads correctly.

![Map on load-in](https://cdn.discordapp.com/attachments/1107347677831778364/1172086605981438014/image.png)

The map can be toggled with a dropdown to the side and swapped for a different view.

![Toggleable options of the map](https://cdn.discordapp.com/attachments/1107347677831778364/1172086924807249960/image.png)

Scrolling down reveals some Plotly graphs of the data collected.

![Plotly graphs](https://cdn.discordapp.com/attachments/1107347677831778364/1172138879697043497/image.png)

What's interesting about Plotly is that you can zoom in to see the charts on a more granular level.

![Plotly graph - zoomed in](https://cdn.discordapp.com/attachments/1107347677831778364/1172139287257567292/image.png)

Finally, there's a scatter plot with some toggleable options on the side so you can see for yourself if anything correlates.

![Toggleable scatter plot](https://cdn.discordapp.com/attachments/1107347677831778364/1172139286922006679/image.png)

## FINAL NOTES
> Project completed on August 10, 2023
- This was a solo project. Admittedly, I was too ambitious and wanted to do too much without the time or manpower at my disposal.
