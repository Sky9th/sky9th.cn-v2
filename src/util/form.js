const form = {}

form.getFieldProps = (formik, field) => {
    let props = formik.getFieldProps(field);
    props.isValid = formik.touched[field] && !formik.errors[field]
    props.isInvalid = formik.touched[field] && !!formik.errors[field]
    return props;
}

form.isTouchAndError = (formik, field) => {
   return formik.touched[field] && formik.errors[field]
}

export default form
