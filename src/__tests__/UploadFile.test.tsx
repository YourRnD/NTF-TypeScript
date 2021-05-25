import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UploadFile from '../components/common/FormControls/UploadFile/UploadFile';

describe('Upload File', () => {
  const clear = jest.fn();
  const add = jest.fn();
  const onChange = jest.fn();

  it('Render component without error message', async () => {
    const { unmount } = render(
      <UploadFile
        placeholder="Test placeholder"
        fileName="test.png"
        id="Test id"
        name="Test name"
        clear={clear}
        add={add}
        onChange={onChange}
        error={null}
        maxElem={2}
        image="./assets/no_file.jpg"
      />
    );

    const uploadFile = screen.getByPlaceholderText('Test placeholder');

    expect(uploadFile).toBeInTheDocument();
    expect(uploadFile).toHaveAttribute('name', 'Test name');
    expect(uploadFile).toHaveAttribute('type', 'file');
    expect(uploadFile).toHaveAttribute('id', 'Test id');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    const imageElem = screen.getByAltText('Image for upload');

    expect(imageElem).toBeInTheDocument();
    expect(imageElem).toHaveAttribute('src', './assets/no_file.jpg');

    const fileNameElem = screen.getByText(/File: test.png/i);

    expect(fileNameElem).toBeInTheDocument();

    const addBtn = screen.queryByTestId('add');
    const clearBtn = screen.queryByTestId('clear');

    expect(addBtn).toBeInTheDocument();
    expect(clearBtn).toBeInTheDocument();

    if (addBtn !== null) {
      fireEvent.click(addBtn);
    }
    if (clearBtn !== null) {
      fireEvent.click(clearBtn);
    }
    fireEvent.change(uploadFile, {
      target: {},
    });

    await waitFor(() => {
      expect(add).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(clear).toHaveBeenCalledTimes(1);
    });

    unmount();
  });

  it('Render component without error message and addBtn', async () => {
    const { unmount } = render(
      <UploadFile
        placeholder="Test placeholder"
        fileName="test.png"
        id="Test id"
        name="Test name"
        clear={clear}
        add={add}
        onChange={onChange}
        error={null}
        maxElem={1}
        image="./assets/no_file.jpg"
      />
    );

    const uploadFile = screen.getByPlaceholderText('Test placeholder');

    expect(uploadFile).toBeInTheDocument();
    expect(uploadFile).toHaveAttribute('name', 'Test name');
    expect(uploadFile).toHaveAttribute('type', 'file');
    expect(uploadFile).toHaveAttribute('id', 'Test id');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    const imageElem = screen.getByAltText('Image for upload');

    expect(imageElem).toBeInTheDocument();
    expect(imageElem).toHaveAttribute('src', './assets/no_file.jpg');

    const fileNameElem = screen.getByText(/File: test.png/i);

    expect(fileNameElem).toBeInTheDocument();

    expect(screen.queryByTestId('add')).not.toBeInTheDocument();

    const clearBtn = screen.queryByTestId('clear');

    expect(clearBtn).toBeInTheDocument();

    if (clearBtn !== null) {
      fireEvent.click(clearBtn);
    }
    fireEvent.change(uploadFile, {
      target: {},
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(clear).toHaveBeenCalledTimes(2);
    });

    unmount();
  });

  it('Render component with error message', async () => {
    const { unmount } = render(
      <UploadFile
        placeholder="Test placeholder"
        fileName="test.png"
        id="Test id"
        name="Test name"
        clear={clear}
        add={add}
        onChange={onChange}
        error="New error"
        maxElem={1}
        image="./assets/no_file.jpg"
      />
    );

    const uploadFile = screen.getByPlaceholderText('Test placeholder');

    expect(uploadFile).toBeInTheDocument();
    expect(uploadFile).toHaveAttribute('name', 'Test name');
    expect(uploadFile).toHaveAttribute('type', 'file');
    expect(uploadFile).toHaveAttribute('id', 'Test id');
    expect(screen.getByText(/New error/i)).toBeInTheDocument();

    const imageElem = screen.getByAltText('Image for upload');

    expect(imageElem).toBeInTheDocument();
    expect(imageElem).toHaveAttribute('src', './assets/no_file.jpg');

    const fileNameElem = screen.getByText(/File: test.png/i);

    expect(fileNameElem).toBeInTheDocument();

    expect(screen.queryByTestId('add')).not.toBeInTheDocument();

    const clearBtn = screen.queryByTestId('clear');

    expect(clearBtn).toBeInTheDocument();

    if (clearBtn !== null) {
      fireEvent.click(clearBtn);
    }
    fireEvent.change(uploadFile, {
      target: {},
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(clear).toHaveBeenCalledTimes(3);
    });

    unmount();
  });

  it('Render component with error message and addBtn', async () => {
    const { unmount } = render(
      <UploadFile
        placeholder="Test placeholder"
        fileName="test.png"
        id="Test id"
        name="Test name"
        clear={clear}
        add={add}
        onChange={onChange}
        error="New error"
        maxElem={2}
        image="./assets/no_file.jpg"
      />
    );

    const uploadFile = screen.getByPlaceholderText('Test placeholder');

    expect(uploadFile).toBeInTheDocument();
    expect(uploadFile).toHaveAttribute('name', 'Test name');
    expect(uploadFile).toHaveAttribute('type', 'file');
    expect(uploadFile).toHaveAttribute('id', 'Test id');
    expect(screen.getByText(/New error/i)).toBeInTheDocument();

    const imageElem = screen.getByAltText('Image for upload');

    expect(imageElem).toBeInTheDocument();
    expect(imageElem).toHaveAttribute('src', './assets/no_file.jpg');

    const fileNameElem = screen.getByText(/File: test.png/i);

    expect(fileNameElem).toBeInTheDocument();

    const addBtn = screen.queryByTestId('add');
    const clearBtn = screen.queryByTestId('clear');

    expect(addBtn).toBeInTheDocument();
    expect(clearBtn).toBeInTheDocument();

    if (addBtn !== null) {
      fireEvent.click(addBtn);
    }
    if (clearBtn !== null) {
      fireEvent.click(clearBtn);
    }
    fireEvent.change(uploadFile, {
      target: {},
    });

    await waitFor(() => {
      expect(add).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(clear).toHaveBeenCalledTimes(4);
    });

    unmount();
  });
});
