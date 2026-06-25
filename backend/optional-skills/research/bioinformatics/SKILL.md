---
name: bioinformatics
description: Gateway to 400+ bioinformatics skills from bioSkills and ClawBio. Covers genomics, transcriptomics, single-cell, variant calling, pharmacogenomics, metagenomics, structural biology, and more. Fetches domain-specific reference material on demand.
version: 1.0.0
platforms: [linux, macos]
metadata:
  zed:
    tags: [bioinformatics, genomics, sequencing, biology, research, science]
    category: research
---

# Bioinformatics Skills Gateway

Use when asked about bioinformatics, genomics, sequencing, variant calling, gene expression, single-cell analysis, protein structure, pharmacogenomics, metagenomics, phylogenetics, or any computational biology task.

This skill is a gateway to two open-source bioinformatics skill libraries. Instead of bundling hundreds of domain-specific skills, it indexes them and fetches what you need on demand.

## Sources

â—† **bioSkills** â€” 385 reference skills (code patterns, parameter guides, decision trees)
  Repo: https://github.com/GPTomics/bioSkills
  Format: SKILL.md per topic with code examples. Python/R/CLI.

â—† **ClawBio** â€” 33 runnable pipeline skills (executable scripts, reproducibility bundles)
  Repo: https://github.com/ClawBio/ClawBio
  Format: Python scripts with demos. Each analysis exports report.md + commands.sh + environment.yml.

## How to fetch and use a skill

1. Identify the domain and skill name from the index below.
2. Clone the relevant repo (shallow clone to save time):
   ```bash
   # bioSkills (reference material)
   git clone --depth 1 https://github.com/GPTomics/bioSkills.git /tmp/bioSkills

   # ClawBio (runnable pipelines)
   git clone --depth 1 https://github.com/ClawBio/ClawBio.git /tmp/ClawBio
   ```
3. Read the specific skill:
   ```bash
   # bioSkills â€” each skill is at: <category>/<skill-name>/SKILL.md
   cat /tmp/bioSkills/variant-calling/gatk-variant-calling/SKILL.md

   # ClawBio â€” each skill is at: skills/<skill-name>/
   cat /tmp/ClawBio/skills/pharmgx-reporter/README.md
   ```
4. Follow the fetched skill as reference material. These are NOT Zed-format skills â€” treat them as expert domain guides. They contain correct parameters, proper tool flags, and validated pipelines.

## Skill Index by Domain

### Sequence Fundamentals
bioSkills:
  sequence-io/ â€” read-sequences, write-sequences, format-conversion, batch-processing, compressed-files, fastq-quality, filter-sequences, paired-end-fastq, sequence-statistics
  sequence-manipulation/ â€” seq-objects, reverse-complement, transcription-translation, motif-search, codon-usage, sequence-properties, sequence-slicing
ClawBio:
  seq-wrangler â€” Sequence QC, alignment, and BAM processing (wraps FastQC, BWA, SAMtools)

### Read QC & Alignment
bioSkills:
  read-qc/ â€” quality-reports, fastp-workflow, adapter-trimming, quality-filtering, umi-processing, contamination-screening, rnaseq-qc
  read-alignment/ â€” bwa-alignment, star-alignment, hisat2-alignment, bowtie2-alignment
  alignment-files/ â€” sam-bam-basics, alignment-sorting, alignment-filtering, bam-statistics, duplicate-handling, pileup-generation

### Variant Calling & Annotation
bioSkills:
  variant-calling/ â€” gatk-variant-calling, deepvariant, variant-calling (bcftools), joint-calling, structural-variant-calling, filtering-best-practices, variant-annotation, variant-normalization, vcf-basics, vcf-manipulation, vcf-statistics, consensus-sequences, clinical-interpretation
ClawBio:
  vcf-annotator â€” VEP + ClinVar + gnomAD annotation with ancestry-aware context
  variant-annotation â€” Variant annotation pipeline

### Differential Expression (Bulk RNA-seq)
bioSkills:
  differential-expression/ â€” deseq2-basics, edger-basics, batch-correction, de-results, de-visualization, timeseries-de
  rna-quantification/ â€” alignment-free-quant (Salmon/kallisto), featurecounts-counting, tximport-workflow, count-matrix-qc
  expression-matrix/ â€” counts-ingest, gene-id-mapping, metadata-joins, sparse-handling
ClawBio:
  rnaseq-de â€” Full DE pipeline with QC, normalization, and visualization
  diff-visualizer â€” Rich visualization and reporting for DE results

### Single-Cell RNA-seq
bioSkills:
  single-cell/ â€” preprocessing, clustering, batch-integration, cell-annotation, cell-communication, doublet-detection, markers-annotation, trajectory-inference, multimodal-integration, perturb-seq, scatac-analysis, lineage-tracing, metabolite-communication, data-io
ClawBio:
  scrna-orchestrator â€” Full Scanpy pipeline (QC, clustering, markers, annotation)
  scrna-embedding â€” scVI-based latent embedding and batch integration

### Spatial Transcriptomics
bioSkills:
  spatial-transcriptomics/ â€” spatial-data-io, spatial-preprocessing, spatial-domains, spatial-deconvolution, spatial-communication, spatial-neighbors, spatial-statistics, spatial-visualization, spatial-multiomics, spatial-proteomics, image-analysis

### Epigenomics
bioSkills:
  chip-seq/ â€” peak-calling, differential-binding, motif-analysis, peak-annotation, chipseq-qc, chipseq-visualization, super-enhancers
  atac-seq/ â€” atac-peak-calling, atac-qc, differential-accessibility, footprinting, motif-deviation, nucleosome-positioning
  methylation-analysis/ â€” bismark-alignment, methylation-calling, dmr-detection, methylkit-analysis
  hi-c-analysis/ â€” hic-data-io, tad-detection, loop-calling, compartment-analysis, contact-pairs, matrix-operations, hic-visualization, hic-differential
ClawBio:
  methylation-clock â€” Epigenetic age estimation

### Pharmacogenomics & Clinical
bioSkills:
  clinical-databases/ â€” clinvar-lookup, gnomad-frequencies, dbsnp-queries, pharmacogenomics, polygenic-risk, hla-typing, variant-prioritization, somatic-signatures, tumor-mutational-burden, myvariant-queries
ClawBio:
  pharmgx-reporter â€” PGx report from 23andMe/AncestryDNA (12 genes, 31 SNPs, 51 drugs)
  drug-photo â€” Photo of medication â†’ personalized PGx dosage card (via vision)
  clinpgx â€” ClinPGx API for gene-drug data and CPIC guidelines
  gwas-lookup â€” Federated variant lookup across 9 genomic databases
  gwas-prs â€” Polygenic risk scores from consumer genetic data
  nutrigx_advisor â€” Personalized nutrition from consumer genetic data

### Population Genetics & GWAS
bioSkills:
  population-genetics/ â€” association-testing (PLINK GWAS), plink-basics, population-structure, linkage-disequilibrium, scikit-allel-analysis, selection-statistics
  causal-genomics/ â€” mendelian-randomization, fine-mapping, colocalization-analysis, mediation-analysis, pleiotropy-detection
  phasing-imputation/ â€” haplotype-phasing, genotype-imputation, imputation-qc, reference-panels
ClawBio:
  claw-ancestry-pca â€” Ancestry PCA against SGDP reference panel

### Metagenomics & Microbiome
bioSkills:
  metagenomics/ â€” kraken-classification, metaphlan-profiling, abundance-estimation, functional-profiling, amr-detection, strain-tracking, metagenome-visualization
  microbiome/ â€” amplicon-processing, diversity-analysis, differential-abundance, taxonomy-assignment, functional-prediction, qiime2-workflow
ClawBio:
  claw-metagenomics â€” Shotgun metagenomics profiling (taxonomy, resistome, functional pathways)

### Genome Assembly & Annotation
bioSkills:
  genome-assembly/ â€” hifi-assembly, long-read-assembly, short-read-assembly, metagenome-assembly, assembly-polishing, assembly-qc, scaffolding, contamination-detection
  genome-annotation/ â€” eukaryotic-gene-prediction, prokaryotic-annotation, functional-annotation, ncrna-annotation, repeat-annotation, annotation-transfer
  long-read-sequencing/ â€” basecalling, long-read-alignment, long-read-qc, clair3-variants, structural-variants, medaka-polishing, nanopore-methylation, isoseq-analysis

### Structural Biology & Chemoinformatics
bioSkills:
  structural-biology/ â€” alphafold-predictions, modern-structure-prediction, structure-io, structure-navigation, structure-modification, geometric-analysis
  chemoinformatics/ â€” molecular-io, molecular-descriptors, similarity-searching, substructure-search, virtual-screening, admet-prediction, reaction-enumeration
ClawBio:
  struct-predictor â€” Local AlphaFold/Boltz/Chai structure prediction with comparison

### Proteomics
bioSkills:
  proteomics/ â€” data-import, peptide-identification, protein-inference, quantification, differential-abundance, dia-analysis, ptm-analysis, proteomics-qc, spectral-libraries
ClawBio:
  proteomics-de â€” Proteomics differential expression

### Pathway Analysis & Gene Networks
bioSkills:
  pathway-analysis/ â€” go-enrichment, gsea, kegg-pathways, reactome-pathways, wikipathways, enrichment-visualization
  gene-regulatory-networks/ â€” scenic-regulons, coexpression-networks, differential-networks, multiomics-grn, perturbation-simulation

### Immunoinformatics
bioSkills:
  immunoinformatics/ â€” mhc-binding-prediction, epitope-prediction, neoantigen-prediction, immunogenicity-scoring, tcr-epitope-binding
  tcr-bcr-analysis/ â€” mixcr-analysis, scirpy-analysis, immcantation-analysis, repertoire-visualization, vdjtools-analysis

### CRISPR & Genome Engineering
bioSkills:
  crispr-screens/ â€” mageck-analysis, jacks-analysis, hit-calling, screen-qc, library-design, crispresso-editing, base-editing-analysis, batch-correction
  genome-engineering/ â€” grna-design, off-target-prediction, hdr-template-design, base-editing-design, prime-editing-design

### Workflow Management
bioSkills:
  workflow-management/ â€” snakemake-workflows, nextflow-pipelines, cwl-workflows, wdl-workflows
ClawBio:
  repro-enforcer â€” Export any analysis as reproducibility bundle (Conda env + Singularity + checksums)
  galaxy-bridge â€” Access 8,000+ Galaxy tools from usegalaxy.org

### Specialized Domains
bioSkills:
  alternative-splicing/ â€” splicing-quantification, differential-splicing, isoform-switching, sashimi-plots, single-cell-splicing, splicing-qc
  ecological-genomics/ â€” edna-metabarcoding, landscape-genomics, conservation-genetics, biodiversity-metrics, community-ecology, species-delimitation
  epidemiological-genomics/ â€” pathogen-typing, variant-surveillance, phylodynamics, transmission-inference, amr-surveillance
  liquid-biopsy/ â€” cfdna-preprocessing, ctdna-mutation-detection, fragment-analysis, tumor-fraction-estimation, methylation-based-detection, longitudinal-monitoring
  epitranscriptomics/ â€” m6a-peak-calling, m6a-differential, m6anet-analysis, merip-preprocessing, modification-visualization
  metabolomics/ â€” xcms-preprocessing, metabolite-annotation, normalization-qc, statistical-analysis, pathway-mapping, lipidomics, targeted-analysis, msdial-preprocessing
  flow-cytometry/ â€” fcs-handling, gating-analysis, compensation-transformation, clustering-phenotyping, differential-analysis, cytometry-qc, doublet-detection, bead-normalization
  systems-biology/ â€” flux-balance-analysis, metabolic-reconstruction, gene-essentiality, context-specific-models, model-curation
  rna-structure/ â€” secondary-structure-prediction, ncrna-search, structure-probing

### Data Visualization & Reporting
bioSkills:
  data-visualization/ â€” ggplot2-fundamentals, heatmaps-clustering, volcano-customization, circos-plots, genome-browser-tracks, interactive-visualization, multipanel-figures, network-visualization, upset-plots, color-palettes, specialized-omics-plots, genome-tracks
  reporting/ â€” rmarkdown-reports, quarto-reports, jupyter-reports, automated-qc-reports, figure-export
ClawBio:
  profile-report â€” Analysis profile reporting
  data-extractor â€” Extract numerical data from scientific figure images (via vision)
  lit-synthesizer â€” PubMed/bioRxiv search, summarization, citation graphs
  pubmed-summariser â€” Gene/disease PubMed search with structured briefing

### Database Access
bioSkills:
  database-access/ â€” entrez-search, entrez-fetch, entrez-link, blast-searches, local-blast, sra-data, geo-data, uniprot-access, batch-downloads, interaction-databases, sequence-similarity
ClawBio:
  ukb-navigator â€” Semantic search across 12,000+ UK Biobank fields
  clinical-trial-finder â€” Clinical trial discovery

### Experimental Design
bioSkills:
  experimental-design/ â€” power-analysis, sample-size, batch-design, multiple-testing

### Machine Learning for Omics
bioSkills:
  machine-learning/ â€” omics-classifiers, biomarker-discovery, survival-analysis, model-validation, prediction-explanation, atlas-mapping
ClawBio:
  claw-semantic-sim â€” Semantic similarity index for disease literature (PubMedBERT)
  omics-target-evidence-mapper â€” Aggregate target-level evidence across omics sources

## Environment Setup

These skills assume a bioinformatics workstation. Common dependencies:

```bash
# Python
pip install biopython pysam cyvcf2 pybedtools pyBigWig scikit-allel anndata scanpy mygene

# R/Bioconductor
Rscript -e 'BiocManager::install(c("DESeq2","edgeR","Seurat","clusterProfiler","methylKit"))'

# CLI tools (Ubuntu/Debian)
sudo apt install samtools bcftools ncbi-blast+ minimap2 bedtools

# CLI tools (macOS)
brew install samtools bcftools blast minimap2 bedtools

# Or via Conda (recommended for reproducibility)
conda install -c bioconda samtools bcftools blast minimap2 bedtools fastp kraken2
```

## Pitfalls

- The fetched skills are NOT in Zed SKILL.md format. They use their own structure (bioSkills: code pattern cookbooks; ClawBio: README + Python scripts). Read them as expert reference material.
- bioSkills are reference guides â€” they show correct parameters and code patterns but aren't executable pipelines.
- ClawBio skills are executable â€” many have `--demo` flags and can be run directly.
- Both repos assume bioinformatics tools are installed. Check prerequisites before running pipelines.
- For ClawBio, run `pip install -r requirements.txt` in the cloned repo first.
- Genomic data files can be very large. Be mindful of disk space when downloading reference genomes, SRA datasets, or building indices.
