import React, {useState} from "react";
const ChapterFilesCreateForm = props => {
    const [fields, setFields] = useState([{ value: null }]);

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    return (
        <>

            <button type="button" onClick={() => handleAdd()}>
                +
            </button>

            {fields.map((field, idx) => {
                return (
                    <div key={`${field}-${idx}`}>
                        <input
                            type="text"
                            placeholder="Enter text"
                            value={field.value || ""}
                            onChange={e => handleChange(idx+1, e)}
                        />
                        <input
                            type="file"
                            value={field.value || ""}
                            onChange={e => handleChange(idx+1, e)}
                        />
                        <button type="button" onClick={() => handleRemove(idx)}>
                            X
                        </button>
                    </div>
                );
            })}
        </>
    );
};
export default ChapterFilesCreateForm;
