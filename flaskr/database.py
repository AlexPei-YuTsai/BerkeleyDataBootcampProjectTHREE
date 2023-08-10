import pandas as pd
import matplotlib as plt
from sqlalchemy import create_engine, text

engine = create_engine('sqlite://', echo = False)
Plastic_df = pd.read_excel("assets/Plastic Data.xlsx")

Plastic_df.to_sql('oceanplastic', con=engine)