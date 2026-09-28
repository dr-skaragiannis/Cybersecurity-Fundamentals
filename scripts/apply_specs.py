#!/usr/bin/env python3
import json
import re

with open("scripts/project_specs.json", "r", encoding="utf-8") as f:
    specs = json.load(f)

for ch_num in range(1, 14):
    path = f"src/content/extensions/ch{ch_num:02d}-ext.ts"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    spec = specs[str(ch_num)]
    
    # 1. Add id and category to TechnicalProject if not present
    proj_var = f"ch{ch_num:02d}Project"
    if "category:" not in content[content.find(f"export const {proj_var}"):]:
        # Find the start of export const chXXProject: TechnicalProject = {
        idx = content.find(f"export const {proj_var}: TechnicalProject = {{")
        if idx != -1:
            header_insert = f"""export const {proj_var}: TechnicalProject = {{
  id: "{spec['id']}",
  category: {{
    en: "{spec['category']['en']}",
    el: "{spec['category']['el']}",
  }},"""
            content = content[:idx] + header_insert + content[idx + len(f"export const {proj_var}: TechnicalProject = {{"):]

    # 2. Inject detailedSpec into milestones 1, 2, 3, 4
    for m_num in range(1, 5):
        m_key = f"m{m_num}"
        m_spec = spec[m_key]
        
        # Check if milestone already has detailedSpec
        # We find the milestone block
        m_pattern = rf"milestoneNumber:\s*{m_num},[\s\S]*?deliverable:"
        match = re.search(m_pattern, content)
        if match:
            matched_text = match.group(0)
            if "detailedSpec:" not in matched_text:
                # Format detailedSpec code
                en_specs = json.dumps(m_spec["en"], indent=10, ensure_ascii=False)
                el_specs = json.dumps(m_spec["el"], indent=10, ensure_ascii=False)
                
                detailed_spec_code = f"""detailedSpec: {{
        en: {en_specs},
        el: {el_specs},
      }},
      deliverable:"""
                new_matched_text = matched_text.replace("deliverable:", detailed_spec_code)
                content = content.replace(matched_text, new_matched_text, 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {path}")

print("All 13 extension files updated with rich detailed milestone specifications!")
