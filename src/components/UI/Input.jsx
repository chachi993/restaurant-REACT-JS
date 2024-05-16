export default function Input({ label, id, ...props }) {
    return <p className="control">
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required {...props}/>
        {/*el name  luego nos permitirá manejar el envío del formulario que  utiliza estas entradas con la ayuda de algunas características  nativas incorporadas en el formulario proporcionadas  por el navegador.*/}
    </p>
}
