library(tidyverse)

data <- readr::read_csv2(here::here("data/preprocessed/all_candidatos_de_2010_a_2016.csv"),
                         local=readr::locale("br")) %>% select(-X1)


mulheres <-  data %>% filter(sexo == "FEMININO") %>% distinct() 

sumario_total <- merge(mulheres %>%
                            filter(total_votos == 0) %>% 
                            group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
                            summarise(cont_candidatas_zero_voto = n()), 
                          mulheres %>% 
                            filter(total_votos > 0) %>% 
                            group_by(ano_eleicao, sigla_partido, sigla_uf) %>% 
                            summarise(cont_candidatas_algum_voto = n()), 
                          by=c("ano_eleicao", "sigla_partido", "sigla_uf")) %>% 
  merge (data %>%
           group_by(ano_eleicao, sigla_partido, sigla_uf) %>%
           summarise(total_candidatos =n()),
           by=c("ano_eleicao", "sigla_partido", "sigla_uf"))

sumario_total <- sumario_total %>% 
  mutate(proporcao_mulheres = (cont_candidatas_zero_voto + cont_candidatas_algum_voto) / total_candidatos)

write.csv2(sumario_mulheres, here::here("data/preprocessed/all_mulheres_sumario.csv"), row.names = FALSE)



teste <- data %>%
  mutate(passou = case_when(stringr::str_detect(desc_sit_candidato, regex("RENÚNCIA")) ~ 'sim'))
