# Author:  Hadrizia Santos, hadrizia.santos@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada os dados do TSE de candidatos e de votações por munzona (município e zona).
# Dados de entrada dos candidatos têm caminho ../data/candidatos/<ano>/candidatos_<ano>.csv;
# Dados de entrada das votações por munzona têm caminho ../data/candidatos/<ano>/resultados_<ano>.csv;
# O ano pertence a [2000, 2016].
# Utiliza também as constantes com os nomes das colunas declarados em /utils/constants.R
# ------------------------- Saída -------------------------------
# Produz como resultado um arquivo denominado 
# ../data/preprocessed/candidatos/candidatos_auxiliar_<ano>.csv, que contém 
# os dados dos candidatos e o resultado das votações de um ano, que está entre [2000,2016].

library(tidyverse)
library(data.table)
source(here::here("r_scripts/resultados/preprocessa_resultados.R"))
source(here::here("r_scripts/candidatos/preprocessa_candidatos.R"))

# Une os dados de candidatos aos de resultados de votação, adicionando o sexo e a raça dos candidatos.
join_resultados_and_candidatos <- function(resultados_data, candidatos_data) { 
  resultados_data <- data.table(resultados_data)
  candidatos_data <- data.table(candidatos_data)
  
  data <- merge(resultados_data, candidatos_data, 
                    by=c("numero_cand", "nome_municipio", 
                         "descricao_cargo", "sigla_uf", "ano_eleicao",
                         "nome_candidato", "nome_urna_candidato", "sigla_partido",
                         "desc_sit_cand_tot", "desc_sit_candidato"))
  data <- data %>% 
    distinct()
  
  return(data)
}

# Recebe o ano e retorna o dataframe com as informações dos candidatos e votações de um ano.
process_candidatos_resultados  <- function(ano = 2016) {
  resultados_df <- preprocess_resultados_por_ano(ano)
  
  candidatos_df <- preprocess_candidatos_por_ano(ano)
  
  resultados_candidatos_joined <- join_resultados_and_candidatos(resultados_df, candidatos_df)
  
  #write.csv(resultados_candidatos_joined, paste0(here::here("data/preprocessed/candidatos/auxiliar/"), "candidatos_auxiliar_", ano, ".csv"), row.names = FALSE)
  
  return(resultados_candidatos_joined)
}

#ano = 2006
#df <- process_candidatos_resultados(ano)
#write.csv(df, paste0(here::here("data/preprocessed/candidatos/auxiliar/"), "candidatos_auxiliar_", ano, ".csv"), row.names = FALSE)
