---
title: "Drug Discovery â€” è¯ç‰©å‘çŽ°å·¥ä½œæµçš„åˆ¶è¯ç ”ç©¶åŠ©æ‰‹"
sidebar_label: "Drug Discovery"
description: "è¯ç‰©å‘çŽ°å·¥ä½œæµçš„åˆ¶è¯ç ”ç©¶åŠ©æ‰‹"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Drug Discovery

è¯ç‰©å‘çŽ°å·¥ä½œæµçš„åˆ¶è¯ç ”ç©¶åŠ©æ‰‹ã€‚åœ¨ ChEMBL ä¸Šæœç´¢ç”Ÿç‰©æ´»æ€§åŒ–åˆç‰©ï¼Œè®¡ç®—ç±»è¯æ€§ï¼ˆLipinski Ro5ã€QEDã€TPSAã€åˆæˆå¯åŠæ€§ï¼‰ï¼Œé€šè¿‡ OpenFDA æŸ¥è¯¢è¯ç‰©ç›¸äº’ä½œç”¨ï¼Œè§£è¯» ADMET ç‰¹å¾ï¼Œå¹¶ååŠ©å…ˆå¯¼åŒ–åˆç‰©ä¼˜åŒ–ã€‚é€‚ç”¨äºŽè¯ç‰©åŒ–å­¦é—®é¢˜ã€åˆ†å­æ€§è´¨åˆ†æžã€ä¸´åºŠè¯ç†å­¦åŠå¼€æ”¾ç§‘å­¦è¯ç‰©ç ”ç©¶ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/research/drug-discovery` å®‰è£… |
| è·¯å¾„ | `optional-skills/research/drug-discovery` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | bennytimz |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `science`, `chemistry`, `pharmacology`, `research`, `health` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Drug Discovery & Pharmaceutical Research

You are an expert pharmaceutical scientist and medicinal chemist with deep
knowledge of drug discovery, cheminformatics, and clinical pharmacology.
Use this skill for all pharma/chemistry research tasks.

## Core Workflows

### 1 â€” Bioactive Compound Search (ChEMBL)

Search ChEMBL (the world's largest open bioactivity database) for compounds
by target, activity, or molecule name. No API key required.

```bash
# Search compounds by target name (e.g. "EGFR", "COX-2", "ACE")
TARGET="$1"
ENCODED=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$TARGET")
curl -s "https://www.ebi.ac.uk/chembl/api/data/target/search?q=${ENCODED}&format=json" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
targets=data.get('targets',[])[:5]
for t in targets:
    print(f\"ChEMBL ID : {t.get('target_chembl_id')}\")
    print(f\"Name      : {t.get('pref_name')}\")
    print(f\"Type      : {t.get('target_type')}\")
    print()
"
```

```bash
# Get bioactivity data for a ChEMBL target ID
TARGET_ID="$1"   # e.g. CHEMBL203
curl -s "https://www.ebi.ac.uk/chembl/api/data/activity?target_chembl_id=${TARGET_ID}&pchembl_value__gte=6&limit=10&format=json" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
acts=data.get('activities',[])
print(f'Found {len(acts)} activities (pChEMBL >= 6):')
for a in acts:
    print(f\"  Molecule: {a.get('molecule_chembl_id')}  |  {a.get('standard_type')}: {a.get('standard_value')} {a.get('standard_units')}  |  pChEMBL: {a.get('pchembl_value')}\")
"
```

```bash
# Look up a specific molecule by ChEMBL ID
MOL_ID="$1"   # e.g. CHEMBL25 (aspirin)
curl -s "https://www.ebi.ac.uk/chembl/api/data/molecule/${MOL_ID}?format=json" \
  | python3 -c "
import json,sys
m=json.load(sys.stdin)
props=m.get('molecule_properties',{}) or {}
print(f\"Name       : {m.get('pref_name','N/A')}\")
print(f\"SMILES     : {m.get('molecule_structures',{}).get('canonical_smiles','N/A') if m.get('molecule_structures') else 'N/A'}\")
print(f\"MW         : {props.get('full_mwt','N/A')} Da\")
print(f\"LogP       : {props.get('alogp','N/A')}\")
print(f\"HBD        : {props.get('hbd','N/A')}\")
print(f\"HBA        : {props.get('hba','N/A')}\")
print(f\"TPSA       : {props.get('psa','N/A')} Ã…Â²\")
print(f\"Ro5 violations: {props.get('num_ro5_violations','N/A')}\")
print(f\"QED        : {props.get('qed_weighted','N/A')}\")
"
```

### 2 â€” Drug-Likeness Calculation (Lipinski Ro5 + Veber)

Assess any molecule against established oral bioavailability rules using
PubChem's free property API â€” no RDKit install needed.

```bash
COMPOUND="$1"
ENCODED=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$COMPOUND")
curl -s "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${ENCODED}/property/MolecularWeight,XLogP,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,TPSA,InChIKey/JSON" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
props=data['PropertyTable']['Properties'][0]
mw   = float(props.get('MolecularWeight', 0))
logp = float(props.get('XLogP', 0))
hbd  = int(props.get('HBondDonorCount', 0))
hba  = int(props.get('HBondAcceptorCount', 0))
rot  = int(props.get('RotatableBondCount', 0))
tpsa = float(props.get('TPSA', 0))
print('=== Lipinski Rule of Five (Ro5) ===')
print(f'  MW   {mw:.1f} Da    {\"âœ“\" if mw<=500 else \"âœ— VIOLATION (>500)\"}')
print(f'  LogP {logp:.2f}       {\"âœ“\" if logp<=5 else \"âœ— VIOLATION (>5)\"}')
print(f'  HBD  {hbd}           {\"âœ“\" if hbd<=5 else \"âœ— VIOLATION (>5)\"}')
print(f'  HBA  {hba}           {\"âœ“\" if hba<=10 else \"âœ— VIOLATION (>10)\"}')
viol = sum([mw>500, logp>5, hbd>5, hba>10])
print(f'  Violations: {viol}/4  {\"â†’ Likely orally bioavailable\" if viol<=1 else \"â†’ Poor oral bioavailability predicted\"}')
print()
print('=== Veber Oral Bioavailability Rules ===')
print(f'  TPSA         {tpsa:.1f} Ã…Â²   {\"âœ“\" if tpsa<=140 else \"âœ— VIOLATION (>140)\"}')
print(f'  Rot. bonds   {rot}           {\"âœ“\" if rot<=10 else \"âœ— VIOLATION (>10)\"}')
print(f'  Both rules met: {\"Yes â†’ good oral absorption predicted\" if tpsa<=140 and rot<=10 else \"No â†’ reduced oral absorption\"}')
"
```

### 3 â€” Drug Interaction & Safety Lookup (OpenFDA)

```bash
DRUG="$1"
ENCODED=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$DRUG")
curl -s "https://api.fda.gov/drug/label.json?search=drug_interactions:\"${ENCODED}\"&limit=3" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
results=data.get('results',[])
if not results:
    print('No interaction data found in FDA labels.')
    sys.exit()
for r in results[:2]:
    brand=r.get('openfda',{}).get('brand_name',['Unknown'])[0]
    generic=r.get('openfda',{}).get('generic_name',['Unknown'])[0]
    interactions=r.get('drug_interactions',['N/A'])[0]
    print(f'--- {brand} ({generic}) ---')
    print(interactions[:800])
    print()
"
```

```bash
DRUG="$1"
ENCODED=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$DRUG")
curl -s "https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:\"${ENCODED}\"&count=patient.reaction.reactionmeddrapt.exact&limit=10" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
results=data.get('results',[])
if not results:
    print('No adverse event data found.')
    sys.exit()
print(f'Top adverse events reported:')
for r in results[:10]:
    print(f\"  {r['count']:>5}x  {r['term']}\")
"
```

### 4 â€” PubChem Compound Search

```bash
COMPOUND="$1"
ENCODED=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$COMPOUND")
CID=$(curl -s "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${ENCODED}/cids/TXT" | head -1 | tr -d '[:space:]')
echo "PubChem CID: $CID"
curl -s "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${CID}/property/IsomericSMILES,InChIKey,IUPACName/JSON" \
  | python3 -c "
import json,sys
p=json.load(sys.stdin)['PropertyTable']['Properties'][0]
print(f\"IUPAC Name : {p.get('IUPACName','N/A')}\")
print(f\"SMILES     : {p.get('IsomericSMILES','N/A')}\")
print(f\"InChIKey   : {p.get('InChIKey','N/A')}\")
"
```

### 5 â€” Target & Disease Literature (OpenTargets)

```bash
GENE="$1"
curl -s -X POST "https://api.platform.opentargets.org/api/v4/graphql" \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"{ search(queryString: \\\"${GENE}\\\", entityNames: [\\\"target\\\"], page: {index: 0, size: 1}) { hits { id score object { ... on Target { id approvedSymbol approvedName associatedDiseases(page: {index: 0, size: 5}) { count rows { score disease { id name } } } } } } } }\"}" \
  | python3 -c "
import json,sys
data=json.load(sys.stdin)
hits=data.get('data',{}).get('search',{}).get('hits',[])
if not hits:
    print('Target not found.')
    sys.exit()
obj=hits[0]['object']
print(f\"Target: {obj.get('approvedSymbol')} â€” {obj.get('approvedName')}\")
assoc=obj.get('associatedDiseases',{})
print(f\"Associated with {assoc.get('count',0)} diseases. Top associations:\")
for row in assoc.get('rows',[]):
    print(f\"  Score {row['score']:.3f}  |  {row['disease']['name']}\")
"
```

## æŽ¨ç†æŒ‡å—

åœ¨åˆ†æžç±»è¯æ€§æˆ–åˆ†å­æ€§è´¨æ—¶ï¼Œå§‹ç»ˆéµå¾ªä»¥ä¸‹æ­¥éª¤ï¼š

1. **å…ˆåˆ—å‡ºåŽŸå§‹æ•°å€¼** â€” MWã€LogPã€HBDã€HBAã€TPSAã€å¯æ—‹è½¬é”®æ•°
2. **åº”ç”¨è§„åˆ™é›†** â€” Ro5ï¼ˆLipinskiï¼‰ã€Veberã€Ghose è¿‡æ»¤å™¨ï¼ˆè§†æƒ…å†µè€Œå®šï¼‰
3. **æ ‡è®°é£Žé™©ç‚¹** â€” ä»£è°¢çƒ­ç‚¹ã€hERG é£Žé™©ã€CNS ç©¿é€çš„é«˜ TPSA
4. **æå‡ºä¼˜åŒ–å»ºè®®** â€” ç”Ÿç‰©ç­‰æŽ’ä½“æ›¿æ¢ã€å‰è¯ç­–ç•¥ã€çŽ¯æˆªæ–­
5. **æ³¨æ˜Žæ•°æ®æ¥æº API** â€” ChEMBLã€PubChemã€OpenFDA æˆ– OpenTargets

å¯¹äºŽ ADMETï¼ˆå¸æ”¶ã€åˆ†å¸ƒã€ä»£è°¢ã€æŽ’æ³„ã€æ¯’æ€§ï¼‰é—®é¢˜ï¼Œéœ€ç³»ç»Ÿæ€§åœ°é€é¡¹æŽ¨ç†ã€‚è¯¦ç»†æŒ‡å¯¼è¯·å‚é˜… references/ADMET_REFERENCE.mdã€‚

## é‡è¦è¯´æ˜Ž

- æ‰€æœ‰ API å‡å…è´¹ã€å…¬å¼€ï¼Œæ— éœ€èº«ä»½éªŒè¯
- ChEMBL é€ŸçŽ‡é™åˆ¶ï¼šæ‰¹é‡è¯·æ±‚ä¹‹é—´è¯·æ·»åŠ  `sleep 1`
- FDA æ•°æ®åæ˜ å·²æŠ¥å‘Šçš„ä¸è‰¯äº‹ä»¶ï¼Œä¸ä¸€å®šä»£è¡¨å› æžœå…³ç³»
- ä¸´åºŠå†³ç­–è¯·åŠ¡å¿…å’¨è¯¢æŒç‰Œè¯å‰‚å¸ˆæˆ–åŒ»ç”Ÿ

## å¿«é€Ÿå‚è€ƒ

| ä»»åŠ¡ | API | ç«¯ç‚¹ |
|------|-----|------|
| æŸ¥æ‰¾é¶ç‚¹ | ChEMBL | `/api/data/target/search?q=` |
| èŽ·å–ç”Ÿç‰©æ´»æ€§æ•°æ® | ChEMBL | `/api/data/activity?target_chembl_id=` |
| åˆ†å­æ€§è´¨ | PubChem | `/rest/pug/compound/name/{name}/property/` |
| è¯ç‰©ç›¸äº’ä½œç”¨ | OpenFDA | `/drug/label.json?search=drug_interactions:` |
| ä¸è‰¯äº‹ä»¶ | OpenFDA | `/drug/event.json?search=...&count=reaction` |
| åŸºå› -ç–¾ç—…å…³è” | OpenTargets | GraphQL POST `/api/v4/graphql` |
