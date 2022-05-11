import React from "react";
import "./style.scss";
import paperClip from "../../../../assets/paper-clip.png"
import Recaptcha from "react-google-recaptcha";

var axios = require("axios");
export default class SendContribution extends React.Component {
    constructor(props) {
        super(props);
        const userName = drupalSettings.user_name || drupalSettings.user_entidade;
        const name = userName || "";
        this.state = {
            fileName: "",
            file: null,
            name: name,
            message: "",
            charactersLimit: 3000,
            checkBox: false,
            isVerified: false,
            showTermsError: false,
            showRecaptchaError: false,
            showFileSizeError: false,
            showFileTypeError: false,
            showMessageError: false,
            fileBase64: "",
            fileLoading: false,
            submmitLoading: false,
        }

    }

    handleFileChange(event) {
        
        try {
            this.setState({ fileLoading: true })
            
            var file = event.target.files[0];
            this.setState({ file: file, fileName: file.name });
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({ fileLoading: false })
        }
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleMessageChange(event) {
        var charactersLimit = 3000 - event.target.value.length;
        this.setState({ message: event.target.value, charactersLimit: charactersLimit });
    }

    hadleRadioChange(event) {
        this.setState({ checkBox: event.target.checked });
    }

    changeCheckBox() {
        this.setState({ checkBox: !this.state.checkBox });
    }

    verifyRecaptcha() {
        this.setState({ isVerified: true })
    }

    expiredRecaptcha() {
        this.setState({ isVerified: false })
    }

    readFileAsync(file) {
        return new Promise((resolve, reject) => {

            let reader = new FileReader();

            reader.onload = () => {
                var base64result = reader.result.split(',')[1]
                resolve(base64result);
            };

            reader.onerror = reject;

            reader.readAsDataURL(file);

        })
    }

    sendContribution = async () => {
        this.setState({ showTermsError: !this.state.checkBox })
        this.setState({ showRecaptchaError: !this.state.isVerified })
        this.setState({ showMessageError: this.state.message === "" ? true : false })
        // Verifing if file has more than 10MB
        if (this.state.file) {
            var fileSizeError = (this.state.file.size > 10485760);
            var fileTypeError = (this.state.file.type !== "application/pdf");
            this.setState({ showFileSizeError: fileSizeError });
            this.setState({ showFileTypeError: fileTypeError });
        }

        if (!drupalSettings.user_cpf && !drupalSettings.user_cnpj) {
            alert("Usuário sem cpf ou cnpj cadastrados");
        }

        if (this.state.checkBox && this.state.isVerified && this.state.message && (drupalSettings.user_cpf || drupalSettings.user_cnpj)) {
            if (!this.state.file || !fileSizeError && !fileTypeError) {

                try {
                    this.setState({ submmitLoading: true })

                    var url = new URL(window.location.href);
                    var idConsultaPublica = +url.searchParams.get("id");
 
                    var autorTelefone = `(${drupalSettings.user_phone.substr(0, 2)})${drupalSettings.user_phone.substr(2, 5)}-${drupalSettings.user_phone.substr(6, 4)}`;
                    console.log(autorTelefone);
                    if (this.state.file) {
                        try {
                            this.setState({ fileLoading: true });
                            var fileBase64 = await this.readFileAsync(this.state.file);

                        } catch (e) {
                            console.log(e);
                        } finally {
                            this.setState({ fileLoading: false });
                        }
                        var arrayAnexo = [];
                        arrayAnexo.push(fileBase64);
                    }
                    await axios.post(`${window.location.origin}:5000/sendContribution`,
                        {
                            idConsultaPublica: idConsultaPublica,
                            autorNome: drupalSettings.user_name || drupalSettings.user_entidade,
                            autorEmail: drupalSettings.user_mail,
                            autorCpfCnpjInformado: drupalSettings.user_cpf || drupalSettings.user_cnpj,
                            arquivoAnexo: arrayAnexo || [],
                            autorTelefone: autorTelefone,
                            texto: this.state.message
                        },
                    )
                        .then((result) => {
                            console.log('Success:', result);
                            alert("Contribuição enviada com sucesso!");
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    this.setState({
                        name: "",
                        message: "",
                        file: null,
                        checked: false,
                        checkBox: false,
                        isVerified: null,
                        fileName: "",
                        charactersLimit: 3000,
                    });

                    this.captcha.reset();
                    this.fileInput.value = "";

                    window.location.replace("/");
                } catch (e) {
                    console.log(e);
                } finally {
                    this.setState({ submmitLoading: false })
                }

            }
        }
    }

    render() {
        const { name } = this.state;
        return (
            <div className="sendContribution">
                <h2 className="title"> Preencha o formulário para enviar sua contribuição </h2>

                <div className="sendContributionContainer">

                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        readOnly
                        className="nameInput"
                        value={name}
                        onChange={(event) => this.handleNameChange(event)}
                    />
                    <div className="messageContainer">
                        <span className="error" style={this.state.showMessageError !== false ? {} : { display: "none" }}>Você deve inserir uma mensagem</span>
                        <textarea
                            name="mensagem"
                            placeholder="Mensagem*"
                            className="messageInput"
                            required
                            onChange={(event) => this.handleMessageChange(event)}
                            rows="10"
                            value={this.state.message}
                            maxLength="3000"
                        />
                    </div>
                    <div className="fileRow">
                        <div className="fileError">
                            <span className="error" style={this.state.showFileSizeError !== false ? {} : { display: "none" }}>O arquivo não pode ter mais de 10mb</span>
                            <span className="error" style={this.state.showFileTypeError !== false ? {} : { display: "none" }}>o arquivo precisa ser do tipo PDF</span>
                            <div className="loadFile">
                                <span>{this.state.fileName === "" ? "Carregar documento..." : this.state.fileLoading ? "Carregando arquivo..." : this.state.fileName}</span>
                                <label htmlFor="fileInput" className="inputButton"><img src={paperClip} /></label>
                            </div>
                        </div>
                        <input
                            ref={e => (this.fileInput = e)}
                            className="fileInput"
                            id="fileInput"
                            type="file"
                            name="file"
                            onChange={(event) => this.handleFileChange(event)}
                            accept="application/pdf"
                        />
                        <span className="charactersLimit">{this.state.charactersLimit} caracteres restantes.</span>
                    </div>

                    <div className="termsRow">
                        <div className="terms">
                            <span className="error" style={this.state.showTermsError !== false ? {} : { display: "none" }}>Você deve aceitar os termos</span>

                            <div className="labeledCheckbox">
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        // className="checkbox"
                                        value={this.state.checkBox}
                                        checked={this.state.checkBox}
                                        onChange={(event) => this.hadleRadioChange(event)}
                                    />
                                    <label
                                        htmlFor="checkbox"
                                        onClick={() => this.changeCheckBox()}
                                    />
                                </div>
                                {/*TODO colocar links para os termos de uso e politica de privacidade*/}
                                <div className="cheboxLabel">
                                    Aceito os <a href="/sites/default/files/termo-de-uso-portal-institucional.pdf" target="_blank" className="link"> Termos de Uso </a> e <a href="/sites/default/files/politica-de-privacidade-portal-institucional.pdf" target="_blank" className="link"> Politica de Privacidade </a> da Assembleia Legislativa do Rio Grande do Sul.
                                </div>
                            </div>
                        </div>
                        <div className="recaptchaContainer">
                            <span className="error" style={this.state.showRecaptchaError !== false ? {} : { display: "none" }}>Você deve preencher o recaptcha</span>

                            <Recaptcha
                                ref={e => (this.captcha = e)}
                                sitekey="6LflwXsaAAAAAMzdAjDnZqXTIK03LZdLbjPa-O5p"
                                onChange={() => this.verifyRecaptcha()}
                                onExpired={() => this.expiredRecaptcha()}
                                hl="pt-BR"
                            />
                        </div>

                    </div>

                    <div className="sendButtonContainer">
                        {!this.state.submmitLoading ?
                            <button
                                className="submitButton"
                                onClick={() => this.sendContribution()}
                            >Enviar
                        </button> :
                            <button
                                className="submitButton"
                            >
                                Carregando
                        </button>
                        }
                        <button className="submitButton" onClick={this.props.onCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}
