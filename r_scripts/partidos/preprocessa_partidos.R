library(functional)
library(plyr)

# Caminho para repositório
setwd('~/nao2/')

# Nome de todos os arquivos necessários
filenames <- list.files("data/candidatos/2012", pattern="votacao_candidato_munzona_*", full.names=TRUE)

# Lendo todos os arquivos e sumarizando em um único arquivo
read_latin <- Curry(read.csv, header=FALSE, stringsAsFactors=FALSE, fileEncoding="latin1")
ldf <- lapply(filenames, read_latin)
df <- ldply(ldf, data.frame)
