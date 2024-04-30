import { Autocomplete, Stack, TextField } from "@mui/material";

interface dataProp {
    label: string;
}

interface Props {
    data: dataProp[];
}

const ListSearchForm = ({ data }: Props) => {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={data.map((option) => option.label)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                            ...params.InputProps,
                            type: "search",
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default ListSearchForm;
