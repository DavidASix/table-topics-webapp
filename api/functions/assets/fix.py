import csv
import json

# Step 2
with open('dataAnnotatioWork.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header
    category_mapping = {old: new for old, new in reader}

# Step 3
with open('questions2.json', 'r') as f:
    questions = json.load(f)

# Step 4
for question in questions:
    if question['category'] in category_mapping:
        question['category'] = category_mapping[question['category']]

# Step 5
with open('questions3.json', 'w') as f:
    json.dump(questions, f, indent=4)