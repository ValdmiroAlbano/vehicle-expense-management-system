import { format } from "date-fns";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import AtlasLogo from "../../../../assets/Atlas Logo.png";

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  infoBox: {
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  logo: {
    marginBottom: 10,
    width: 100,
    height: 30,
    alignSelf: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#777",
  },
  textInput: {
    width: "100%",
    height: 40,
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: 5,
  },
});

// Componente AtividadePDF
const AtividadePDF = ({ data }) => (
  <Document>
    {data.map((item) => (
      <Page key={item.IDOS} size="A4" style={styles.page}>
        <Image src={AtlasLogo} style={styles.logo} />
        <Text style={styles.title}>Ordem de Serviço #{item.IDOS}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Descrição:</Text>
          <Text style={styles.text}>{item.Descricao}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Veículo:</Text>
          <Text style={styles.text}>{item.Placa}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.text}>Em progresso</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Data de inicio:</Text>
          <Text style={styles.text}>
            {item.DataInicio
              ? format(new Date(item.DataInicio), "dd/MM/yyyy")
              : ""}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Data de finalização:</Text>
          <Text style={styles.text}>
            {item.DataFim ? format(new Date(item.DataFim), "dd/MM/yyyy") : ""}
          </Text>
        </View>

        <Text style={styles.subtitle}>Detalhes da Manutenção:</Text>
        <View style={styles.section}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Tecnicos Auxilhares:</Text>
            <Text style={styles.text}></Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Tipo de Manutenção:</Text>
            <Text style={styles.text}></Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Custo das Peças:</Text>
            <Text style={styles.text}>Kz ______</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Custo Total:</Text>
            <Text style={styles.text}>Kz ______</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Descrição do Serviço:</Text>
            <Text
              style={[styles.text, styles.textInput]}
              editable={true}
              multiline={true}
              placeholder="Descreva o serviço realizado..."
            />
          </View>
        </View>
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
    ))}
  </Document>
);

export default AtividadePDF;
